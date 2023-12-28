from fastapi import WebSocket, FastAPI
import random
import uvicorn
from starlette.websockets import WebSocketDisconnect
import asyncio
from typing import List
import logging

app = FastAPI()

async def generate_nucleotides(websocket: WebSocket):
    nucleotides = ['A', 'T', 'C', 'G']
    stop_codons = ['TAA', 'TAG', 'TGA']

    try:
        i = 0
        complete_sequence = ""

        while True:
            nucleotide = random.choice(nucleotides)
            await websocket.send_text(nucleotide)
            #print(nucleotide)

            complete_sequence += nucleotide
            i += 1

            # Check al quarto giro se complete_sequence contiene uno dei tre codoni
            if i > 4 and complete_sequence[-3:] in stop_codons:
                await websocket.send_text(" Stop Codon Identified. Stream stopped !")
                break  # Usa break per uscire dal loop interno

            await asyncio.sleep(1)

    except asyncio.TimeoutError:
        # Handle timeout (no response received within 1 second)
        await websocket.send_text("")
        await generate_nucleotides(websocket)
    except WebSocketDisconnect:
        # Handle disconnection by restarting the sequence
        await websocket.send_text("Disconnection. Restarting the sequence.")
        await generate_nucleotides(websocket)

@app.get("/")
def welcome_message():
    return {"Welcome on backend dna sequence app"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await generate_nucleotides(websocket)