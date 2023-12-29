# app_dna_sequence_identification

**Randomic Rybosome Web Application**

**Description:**
This project is a simple and lightweight web application built using Python, TypeScript, and Tailwind CSS. The application simulates the random generation of nucleotides (adenine, thymine, cytosine, and guanine) in real-time, forming a dynamic DNA sequence. The main functionality involves server-side generation of nucleotides, with the stream terminating upon the occurrence of a stop codon – the nucleotide triplets TAA, TAG, or TGA.

https://github.com/M-ballabio1/app_dna_sequence_identification/assets/78934727/cb670449-0ffe-4c3e-9323-35de5617af10

**Features:**

- **Server-Side:**
  - Continuously generates random nucleotides (A, T, C, G) every 1 second.
  - Ceases nucleotide streaming upon encountering a stop codon (TAA, TAG, TGA), mimicking the end of protein synthesis during translation.

- **Client-Side:**
  - Real-time display of the streaming DNA sequence as users connect to the application.
  - Instant notification to users when a stop codon is identified.

**Technologies Used:**
- **Backend:**
  - Python for server-side logic.
  - Flask for the web framework.
  
- **Frontend:**
  - TypeScript for client-side scripting.
  - Tailwind CSS for a clean and responsive user interface.

**How to Use:**
1. Clone the repository.
2. Install the necessary dependencies.
3. Run the server-side Python script.
4. Connect to the application using a web browser to witness real-time DNA sequence generation.
5. Receive notifications when a stop codon is identified.

**Note:**
This project was developed in a time-constrained environment (2 hours) to fulfill the specific requirement of simulating a randomic ribosome generating a DNA sequence with server-side streaming and client-side visualization.

**Disclaimer:**
This project is a simple demonstration and may not be suitable for production use. It serves as an educational and illustrative example of combining Python, TypeScript, and Tailwind CSS for a real-time web application.



