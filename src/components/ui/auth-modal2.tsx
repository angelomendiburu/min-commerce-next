"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  if (!open) return null;
  const callbackUrl = typeof window !== 'undefined' ? window.location.origin + "/catalog" : "/catalog";

  // Lógica para forzar selección de cuenta en Google
  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl,
      prompt: "select_account"
    });
  };

  // Lógica para forzar selección de cuenta en GitHub
  const handleGithubLogin = () => {
    const githubLogout = window.open("https://github.com/logout", "_blank", "width=500,height=600");
    setTimeout(() => {
      if (githubLogout) githubLogout.close();
      signIn("github", { callbackUrl });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Inicia sesión para continuar</h2>
        <p className="mb-6 text-sm text-gray-600">Debes iniciar sesión para agregar productos al carrito.</p>
        <Button className="w-full mb-2" onClick={handleGoogleLogin}>
          Iniciar sesión con Google
        </Button>
        <Button className="w-full mb-2" variant="secondary" onClick={handleGithubLogin}>
          Iniciar sesión con GitHub
        </Button>
        <Button variant="outline" className="w-full" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}
