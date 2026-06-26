# BRIEFING — TEMPLATE PREMIUM SAÚDE

## Nicho
Profissionais de saúde: nutricionistas, médicos, psicólogos, fisioterapeutas, odontologistas, personal trainers, terapeutas ocupacionais.

## Vocabulário por especialidade
- Nutricionista / Médico / Fisioterapeuta / Odontologista → **pacientes**
- Psicólogo / Terapeuta → **clientes** ou **pacientes**
- Personal trainer / Coach de saúde → **clientes** ou **alunos**

## Dores do público
1. Agenda com horários vazios e faturamento imprevisível
2. Dependência total de indicações de outros pacientes
3. Dificuldade de se diferenciar em mercado saturado
4. Medo ou desconhecimento sobre marketing digital
5. Tentativas frustradas com tráfego pago sem resultado
6. Sensação de que "tráfego pago não funciona para saúde"
7. Tempo limitado para cuidar do marketing enquanto atende

## Linguagem que converte
- Usar "você" (não "tu")
- Foco em resultados mensuráveis: agenda cheia, faturamento previsível, novos pacientes
- Evitar termos genéricos: "sucesso", "realização pessoal", "sonhos"
- Priorizar especificidade: "3-5 novos pacientes por mês", "agenda com 80% de ocupação"
- Tom: profissional mas acessível, empático mas direto

## Regras de compliance em saúde
- NUNCA prometer cura, emagrecimento garantido ou resultados médicos específicos
- NUNCA usar linguagem que possa ser interpretada como garantia de resultado clínico
- PODE prometer: mais pacientes, agenda mais cheia, faturamento crescente, visibilidade digital
- CTAs aceitáveis: "diagnóstico gratuito", "conversa sem compromisso", "análise do seu caso"

## Identidade Visual
- Manter cores definidas no client.config.ts (não alterar sem instrução explícita)
- Background escuro obrigatório
- Tipografia: Cormorant Garamond (títulos) + DM Sans (corpo)
- Gradiente de texto nos destaques das headlines

## Stack Técnico
- Next.js 14+ App Router
- TypeScript strict
- Tailwind CSS v3 com CSS variables para cores
- Framer Motion para animações
- Todos os dados vêm de client.config.ts — NUNCA hardcodar conteúdo do cliente

## O que PODE modificar
- Layout e espaçamento das seções
- Número de cards em ProblemaSection e SolucaoSection
- Animações e efeitos visuais
- Ordem das seções (exceto Header e Footer)
- Texto e copy dentro dos limites de compliance

## O que NUNCA modificar sem instrução explícita
- Cores definidas no client.config.ts
- Fonte tipográfica
- Número de WhatsApp no config
- Estrutura do QualificationModal
- Imports e exports dos componentes
