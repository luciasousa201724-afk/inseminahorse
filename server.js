import path from "path";
import fs from "fs";

const start = async () => {
  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod") {
    const compiledPath = path.join(process.cwd(), "dist", "server.cjs");
    if (fs.existsSync(compiledPath)) {
      await import("./dist/server.cjs");
    } else {
      console.error("Arquivo dist/server.cjs não encontrado. Certifique-se de que o comando 'npm run build' foi executado com sucesso.");
    }
  } else {
    // Em desenvolvimento, importa e executa o servidor TypeScript diretamente via tsx
    await import("./server.ts");
  }
};

start().catch((err) => {
  console.error("Falha ao iniciar o servidor:", err);
});
