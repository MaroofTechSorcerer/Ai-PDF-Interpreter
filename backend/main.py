from fastapi import FastAPI, UploadFile, File, HTTPException, Form, Body
from fastapi.responses import JSONResponse, FileResponse, StreamingResponse
from pdf_utils import (
    extract_text_from_pdf, merge_pdfs, split_pdf, extract_images_from_pdf,
    pdf_to_images, search_pdf
)
from ai_utils import summarize_text, translate_text, bullet_points
import os
import shutil
from typing import List, Optional
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import io
import zipfile

app = FastAPI()

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'outputs')
os.makedirs(OUTPUT_DIR, exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

class TextRequest(BaseModel):
    text: str
    language: Optional[str] = "en"

class TranslateRequest(BaseModel):
    text: str
    target_lang: str

class BulletsRequest(BaseModel):
    text: str
    language: Optional[str] = "en"

class ExportSummaryRequest(BaseModel):
    summary: str

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/extract-text")
def extract_text(pdf: UploadFile = File(...)):
    if not pdf.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF.")
    try:
        text = extract_text_from_pdf(pdf.file)
        return JSONResponse({"text": text})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/summarize-text")
def summarize_text_endpoint(req: TextRequest = Body(...)):
    try:
        summary = summarize_text(req.text, req.language)
        return JSONResponse({"summary": summary})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/translate-text")
def translate_text_endpoint(req: TranslateRequest = Body(...)):
    try:
        translated = translate_text(req.text, req.target_lang)
        return JSONResponse({"translated": translated})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/bullets-text")
def bullets_text_endpoint(req: BulletsRequest = Body(...)):
    try:
        bullets_out = bullet_points(req.text, req.language)
        return JSONResponse({"bullets": bullets_out})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/summarize")
def summarize(pdf: UploadFile = File(...), language: str = Form("en")):
    if not pdf.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF.")
    try:
        text = extract_text_from_pdf(pdf.file)
        summary = summarize_text(text, language)
        return JSONResponse({"summary": summary})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/translate")
def translate(pdf: UploadFile = File(...), target_lang: str = Form(...)):
    if not pdf.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF.")
    try:
        text = extract_text_from_pdf(pdf.file)
        translated = translate_text(text, target_lang)
        return JSONResponse({"translated": translated})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/bullets")
def bullets(pdf: UploadFile = File(...), language: str = Form("en")):
    if not pdf.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF.")
    try:
        text = extract_text_from_pdf(pdf.file)
        bullets_out = bullet_points(text, language)
        return JSONResponse({"bullets": bullets_out})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/split")
def split(pdf: UploadFile = File(...), page_ranges: str = Form(...)):
    # page_ranges: e.g. "0-2,3-4" (zero-based, inclusive)
    try:
        ranges = [[int(x) for x in r.split('-')] for r in page_ranges.split(',')]
        output_files = split_pdf(pdf.file, ranges, OUTPUT_DIR)
        # Return list of file names
        return JSONResponse({"files": [os.path.basename(f) for f in output_files]})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/extract-images")
def extract_images(pdf: UploadFile = File(...)):
    try:
        img_files = extract_images_from_pdf(pdf.file, OUTPUT_DIR)
        return JSONResponse({"images": [os.path.basename(f) for f in img_files]})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/pdf-to-images")
def pdf_to_imgs(pdf: UploadFile = File(...)):
    try:
        img_files = pdf_to_images(pdf.file, OUTPUT_DIR)
        return JSONResponse({"images": [os.path.basename(f) for f in img_files]})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/search")
def search(pdf: UploadFile = File(...), query: str = Form(...)):
    try:
        results = search_pdf(pdf.file, query)
        return JSONResponse({"results": results})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/export-summary")
def export_summary(req: ExportSummaryRequest = Body(...)):
    try:
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import letter
        out_path = os.path.join(OUTPUT_DIR, "summary.pdf")
        c = canvas.Canvas(out_path, pagesize=letter)
        width, height = letter
        lines = req.summary.split('\n')
        y = height - 50
        for line in lines:
            c.drawString(50, y, line)
            y -= 20
            if y < 50:
                c.showPage()
                y = height - 50
        c.save()
        return FileResponse(out_path, filename="summary.pdf")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/summarize-pdf")
def summarize_pdf(pdf: UploadFile = File(...), language: str = Form("en")):
    if not pdf.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF.")
    try:
        text = extract_text_from_pdf(pdf.file)
        summary = summarize_text(text, language)
        return JSONResponse({"summary": summary})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/extract-images-direct")
def extract_images_direct(pdf: UploadFile = File(...)):
    try:
        import pdfplumber
        import hashlib
        from PIL import Image
        images = []
        hashes = set()
        with pdfplumber.open(pdf.file) as pdf_doc:
            for i, page in enumerate(pdf_doc.pages):
                for j, img in enumerate(page.images):
                    im = page.to_image(resolution=300).original
                    img_bytes = im.tobytes()
                    img_hash = hashlib.md5(img_bytes).hexdigest()
                    if img_hash in hashes:
                        continue
                    hashes.add(img_hash)
                    img_io = io.BytesIO()
                    im.save(img_io, format="PNG")
                    img_io.seek(0)
                    images.append((f'page_{i+1}_img_{j+1}.png', img_io.read()))
        # Create a zip in memory
        zip_io = io.BytesIO()
        with zipfile.ZipFile(zip_io, mode="w", compression=zipfile.ZIP_DEFLATED) as zf:
            for filename, data in images:
                zf.writestr(filename, data)
        zip_io.seek(0)
        return StreamingResponse(zip_io, media_type="application/x-zip-compressed", headers={"Content-Disposition": "attachment; filename=extracted_images.zip"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/extract-images-selected-zip")
def extract_images_selected_zip(filenames: List[str] = Body(...)):
    try:
        zip_io = io.BytesIO()
        with zipfile.ZipFile(zip_io, mode="w", compression=zipfile.ZIP_DEFLATED) as zf:
            for filename in filenames:
                file_path = os.path.join(OUTPUT_DIR, filename)
                if os.path.exists(file_path):
                    with open(file_path, "rb") as f:
                        zf.writestr(filename, f.read())
        zip_io.seek(0)
        return StreamingResponse(zip_io, media_type="application/x-zip-compressed", headers={"Content-Disposition": "attachment; filename=selected_images.zip"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/split-zip")
def split_zip(filenames: List[str] = Body(...)):
    try:
        zip_io = io.BytesIO()
        with zipfile.ZipFile(zip_io, mode="w", compression=zipfile.ZIP_DEFLATED) as zf:
            for filename in filenames:
                file_path = os.path.join(OUTPUT_DIR, filename)
                if os.path.exists(file_path):
                    with open(file_path, "rb") as f:
                        zf.writestr(filename, f.read())
        zip_io.seek(0)
        return StreamingResponse(zip_io, media_type="application/x-zip-compressed", headers={"Content-Disposition": "attachment; filename=split_pdfs.zip"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/pdf-to-images-direct")
def pdf_to_images_direct(pdf: UploadFile = File(...)):
    try:
        from pdf2image import convert_from_bytes
        pdf.file.seek(0)
        images = convert_from_bytes(pdf.file.read())
        zip_io = io.BytesIO()
        with zipfile.ZipFile(zip_io, mode="w", compression=zipfile.ZIP_DEFLATED) as zf:
            for i, img in enumerate(images):
                img_io = io.BytesIO()
                img.save(img_io, format="PNG")
                img_io.seek(0)
                zf.writestr(f'page_{i+1}.png', img_io.read())
        zip_io.seek(0)
        return StreamingResponse(zip_io, media_type="application/x-zip-compressed", headers={"Content-Disposition": "attachment; filename=pdf_pages.zip"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/pdf-to-images-selected-zip")
def pdf_to_images_selected_zip(filenames: list = Body(...)):
    try:
        zip_io = io.BytesIO()
        for filename in filenames:
            if not filename.endswith('.png'):
                raise HTTPException(status_code=400, detail="Only PNG files allowed.")
        with zipfile.ZipFile(zip_io, mode="w", compression=zipfile.ZIP_DEFLATED) as zf:
            for filename in filenames:
                file_path = os.path.join(OUTPUT_DIR, filename)
                if os.path.exists(file_path):
                    with open(file_path, "rb") as f:
                        zf.writestr(filename, f.read())
        zip_io.seek(0)
        return StreamingResponse(zip_io, media_type="application/x-zip-compressed", headers={"Content-Disposition": "attachment; filename=selected_pdf_images.zip"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/merge")
def merge(files: list[UploadFile] = File(...)):
    try:
        from PyPDF2 import PdfWriter, PdfReader
        merger = PdfWriter()
        for file in files:
            file.file.seek(0)
            reader = PdfReader(file.file)
            for page in reader.pages:
                merger.add_page(page)
        merged_io = io.BytesIO()
        merger.write(merged_io)
        merged_io.seek(0)
        return StreamingResponse(merged_io, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=merged.pdf"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 