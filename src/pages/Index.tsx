import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs.", variant: "destructive" });
      return;
    }

    const subject = encodeURIComponent(`Intérêt pour l'achat du site — de ${name}`);
    const body = encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:hassane9095@gmail.com?subject=${subject}&body=${body}`;

    toast({ title: "Redirection", description: "Votre client email va s'ouvrir." });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-block rounded-full bg-destructive/10 px-4 py-1 text-sm font-semibold text-destructive tracking-wide uppercase">
            À vendre
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Ce site est en vente
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Vous êtes intéressé par l'acquisition de ce site ? Remplissez le formulaire ci-dessous pour nous contacter.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-lg">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" placeholder="Votre nom" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input id="email" type="email" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Votre message…" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Envoyer
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          En cliquant sur « Envoyer », votre client email s'ouvrira avec un message pré-rempli.
        </p>
      </div>
    </div>
  );
};

export default Index;
