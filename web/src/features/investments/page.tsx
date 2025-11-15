import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const investments = [
  {
    name: "Tesouro Direto",
    value: 5000,
    goal: 10000,
    lastUpdate: "2024-06-10",
  },
  {
    name: "Fundos Imobiliários",
    value: 3200,
    goal: 5000,
    lastUpdate: "2024-06-08",
  },
  {
    name: "Ações",
    value: 15000,
    goal: 20000,
    lastUpdate: "2024-06-09",
  },
];

export default function InvestmentsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Acompanhamento de Investimentos Pessoais</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {investments.map((inv) => (
          <Card key={inv.name}>
            <CardHeader>
              <CardTitle>{inv.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-sm text-muted-foreground">
                Valor atual: <span className="font-semibold">R$ {inv.value.toLocaleString()}</span>
              </div>
              <div className="mb-2 text-sm text-muted-foreground">
                Meta: <span className="font-semibold">R$ {inv.goal.toLocaleString()}</span>
              </div>
              <Progress value={(inv.value / inv.goal) * 100} className="mb-4" />
              <div className="text-xs text-muted-foreground mb-4">
                Última atualização: {inv.lastUpdate}
              </div>
              <Button variant="outline" size="sm">
                Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
