# pdf_utils.py
# PDF processing utility functions will go here. 

import PyPDF2
from typing import IO, List
import os
from PyPDF2 import PdfWriter, PdfReader
from PIL import Image
import pdfplumber
import hashlib

def extract_text_from_pdf(file: IO) -> str:
    """Extracts all text from a PDF file-like object."""
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text 

def merge_pdfs(pdf_files: List[IO], output_path: str) -> str:
    merger = PdfWriter()
    for file in pdf_files:
        reader = PdfReader(file)
        for page in reader.pages:
            merger.add_page(page)
    with open(output_path, 'wb') as f_out:
        merger.write(f_out)
    return output_path

def split_pdf(pdf_file: IO, page_ranges: List[List[int]], output_dir: str) -> List[str]:
    reader = PdfReader(pdf_file)
    output_files = []
    for idx, page_range in enumerate(page_ranges):
        writer = PdfWriter()
        for page_num in range(page_range[0], page_range[1]+1):
            writer.add_page(reader.pages[page_num])
        filename = f'split_{idx+1}.pdf'
        out_path = os.path.join(output_dir, filename)
        with open(out_path, 'wb') as f_out:
            writer.write(f_out)
        print(f"[DEBUG] Saved split PDF: {out_path}")
        output_files.append(filename)
    print(f"[DEBUG] Returning split files: {output_files}")
    return sorted(set(output_files))

def extract_images_from_pdf(pdf_file: IO, output_dir: str) -> List[str]:
    images = set()
    hashes = set()
    with pdfplumber.open(pdf_file) as pdf:
        for i, page in enumerate(pdf.pages):
            for j, img in enumerate(page.images):
                im = page.to_image(resolution=300).original
                # Hash the image bytes
                img_bytes = im.tobytes()
                img_hash = hashlib.md5(img_bytes).hexdigest()
                if img_hash in hashes:
                    continue
                hashes.add(img_hash)
                filename = f'page_{i+1}_img_{j+1}.png'
                img_path = os.path.join(output_dir, filename)
                im.save(img_path, format="PNG")
                print(f"[DEBUG] Saved unique image: {img_path}")
                images.add(filename)
    result = sorted(images)
    print(f"[DEBUG] Returning extracted images: {result}")
    return result

def pdf_to_images(pdf_file: IO, output_dir: str) -> List[str]:
    from pdf2image import convert_from_bytes
    pdf_file.seek(0)
    images = convert_from_bytes(pdf_file.read())
    img_paths = []
    for i, img in enumerate(images):
        filename = f'page_{i+1}.png'
        img_path = os.path.join(output_dir, filename)
        img.save(img_path, 'PNG')
        print(f"[DEBUG] Saved PDF page as image: {img_path}")
        img_paths.append(filename)
    print(f"[DEBUG] Returning PDF to images: {img_paths}")
    return img_paths

def search_pdf(pdf_file: IO, query: str) -> List[dict]:
    results = []
    reader = PdfReader(pdf_file)
    for i, page in enumerate(reader.pages):
        text = page.extract_text() or ""
        if query.lower() in text.lower():
            results.append({"page": i+1, "snippet": text})
    return results 