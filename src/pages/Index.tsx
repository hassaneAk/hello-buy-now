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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/livraisonfacilefr@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Intérêt pour l'achat du site — de ${name}`,
        }),
      });

      if (response.ok) {
        toast({ title: "Envoyé !", description: "Votre message a bien été envoyé." });
        setName("");
        setEmail("");
        setMessage("");
      } else if (response.status === 429) {
        toast({ title: "Trop de requêtes", description: "Veuillez patienter quelques minutes avant de réessayer.", variant: "destructive" });
      } else {
        toast({ title: "Erreur", description: "L'envoi a échoué, réessayez.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur", description: "L'envoi a échoué, réessayez.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <article className="w-full max-w-lg space-y-8">
        <header className="text-center space-y-3">
          <span className="inline-block rounded-full bg-destructive/10 px-4 py-1 text-sm font-semibold text-destructive tracking-wide uppercase">
            À vendre
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Livraison Facile — Site à vendre
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Vous êtes intéressé par l'acquisition de ce site de livraison ? Remplissez le formulaire ci-dessous pour nous contacter.
          </p>
        </header>

        <section aria-label="Formulaire de contact">
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
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Envoi en cours…" : "Envoyer"}
            </Button>
          </form>
        </section>

        <footer className="text-center text-xs text-muted-foreground">
          <p>Votre message sera envoyé directement à notre boîte de réception.</p>
        </footer>
      </article>
    </main>
  );
};

export default Index;
