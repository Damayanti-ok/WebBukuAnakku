
import { GoogleGenAI, Type } from "@google/genai";
import type { Book, Filters } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const bookSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "Judul buku yang menarik dan cocok untuk anak-anak.",
    },
    author: {
      type: Type.STRING,
      description: "Nama pengarang buku (bisa nama fiktif).",
    },
    description: {
      type: Type.STRING,
      description: "Deskripsi singkat dan memikat tentang isi buku, sekitar 2-3 kalimat.",
    },
  },
  required: ["title", "author", "description"],
};

export const fetchBookRecommendations = async (filters: Filters): Promise<Book[]> => {
  const { age, genre, theme } = filters;

  const prompt = `Buatkan daftar 6 judul buku anak fiksi, lengkap dengan pengarang dan deskripsi singkatnya. Buku-buku ini harus sesuai untuk kelompok usia ${age}, bergenre ${genre}, dan mengangkat tema tentang ${theme}. Pastikan judul dan deskripsi kreatif dan memikat untuk anak-anak.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: bookSchema,
        },
        temperature: 0.8,
      },
    });

    const jsonString = response.text.trim();
    const parsedBooks: Omit<Book, 'id' | 'coverImageUrl'>[] = JSON.parse(jsonString);

    // Add unique ID and placeholder image to each book
    return parsedBooks.map((book, index) => ({
      ...book,
      id: `${Date.now()}-${index}`,
      coverImageUrl: `https://picsum.photos/seed/${book.title.replace(/\s/g, '')}/400/600`,
    }));
  } catch (error) {
    console.error("Error fetching book recommendations from Gemini:", error);
    throw new Error("Failed to generate book recommendations.");
  }
};
