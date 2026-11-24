import { useState, useMemo } from 'react';

import { 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  Award, 
  AlertCircle, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  X, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  HeartPulse,
  Syringe,
  Activity,
  Calculator,
  Compass,
  MessageSquare
} from 'lucide-react';

// Born-expert generated image assets
import logoUrl from './assets/images/logo_1780969765272.png';
import mareAndFoalUrl from './assets/images/mare_and_foal_1780969781224.png';
import sickFoalUrl from './assets/images/sick_foal_treatment_1780969797008.png';
import ultrasoundUrl from './assets/images/equine_ultrasound_1780969814617.png';
import brandBadgeUrl from './assets/images/brand_badge_logo_1780970234409.png';
import heroBackgroundPalominoUrl from './assets/images/hero_background_palomino_1780970856597.png';
import successResultBannerUrl from './assets/images/success_result_banner_1780971313272.png';
import inseminahorseGreenLogoUrl from './assets/images/inseminahorse_green_logo_1780971337193.png';

// Type definitions
interface Service {
  nome: string;
  slug: string;
  descricao: string;
  detalhes: string[];
  duracaoEstimada: string;
  imagem?: string;
}

interface Testimonial {
  autor: string;
  propriedade: string;
  cidade: string;
  texto: string;
  estrelas: number;
}

interface Step {
  num: number;
  titulo: string;
  descricao: string;
  detalheTecnico: string;
}

interface FAQItem {
  pergunta: string;
  resposta: string;
  categoria: string;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqSearch, setFaqSearch] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Interactive Simulator State
  const [numEguas, setNumEguas] = useState(10);
  const [metodoAtual, setMetodoAtual] = useState<'monta_natural' | 'inseminacao_simples'>('monta_natural');
  const [calculoFeito, setCalculoFeito] = useState(true);

  // Interactive Breeding Guide State
  const [selectedServiceTimeline, setSelectedServiceTimeline] = useState<string | null>(null);

  // Constants
  const WHATSAPP_NUMBER = "5565999999999";
  const PHONE_DISPLAY = "(65) 99695-9592";
  const CLINIC_ADDRESS = "Av. João Eugênio Gonçalves Pinheiro, 410 - Areão, Cuiabá - MT";

  const servicos: Service[] = [
    {
      nome: "Inseminação em Cavalos",
      slug: "inseminacao-equina",
      descricao: "Tecnologia avançada para maximizar os índices de prenhez com foco em genética de excelência.",
      duracaoEstimada: "Baseado no ciclo estral da égua",
      detalhes: [
        "Avaliação ginecológica e folicular completa via ultrassom",
        "Inseminação com sêmen fresco, resfriado ou congelado de alta qualidade",
        "Indução de ovulação e acompanhamento pós-cobertura meticuloso",
        "Diagnóstico precoce de gestação a partir de 11 dias"
      ],
      imagem: mareAndFoalUrl
    },
    {
      nome: "Atendimento de Emergência",
      slug: "emergencia-equina",
      descricao: "Suporte técnico especializado disponível para garantir a saúde e bem-estar do seu animal nas horas críticas.",
      duracaoEstimada: "Imediato / Sob consulta rápida",
      detalhes: [
        "Pronto atendimento para cólicas equinas e traumas agudos",
        "Avaliação de distocias (partos difíceis) e retenção de placenta",
        "Protocolos de estabilização respiratória e metabólica",
        "Acesso rápido a veterinários especialistas de plantão em MT"
      ],
      imagem: sickFoalUrl
    },
    {
      nome: "Exames Veterinários",
      slug: "exames-veterinarios",
      descricao: "Diagnósticos precisos realizados com equipamentos modernos para maior segurança e previsibilidade do criador.",
      duracaoEstimada: "Resultados no mesmo dia ou imediatos",
      detalhes: [
        "Ultrassonografia reprodutiva de alta resolução",
        "Avaliação laboratorial andrológica preliminar",
        "Análise microscópica de sêmen e testes de viabilidade",
        "Laudos técnicos detalhados para transferência de embriões"
      ],
      imagem: ultrasoundUrl
    }
  ];

  const diferenciais = [
    {
      titulo: "Genética de excelência em todos os procedimentos",
      descricao: "Trabalhamos focados em perpetuar as melhores linhagens genéticas, aliando biotecnologia moderna ao manejo técnico rigoroso."
    },
    {
      titulo: "Suporte técnico especializado do início ao fim",
      descricao: "O criador nunca fica sem resposta. Cada etapa do ciclo de inseminação é documentada e explicada com transparência total."
    },
    {
      titulo: "Tecnologia que maximiza os índices de prenhez",
      descricao: "Utilizamos equipamentos de ultrassonografia de altíssima precisão para monitoramento folicular milimétrico e ótimos resultados."
    }
  ];

  const etapas: Step[] = [
    {
      num: 1,
      titulo: "Contato Inicial",
      descricao: "Você inicia sua solicitação de suporte técnico através do nosso WhatsApp.",
      detalheTecnico: "Nesse momento, coletamos informações básicas sobre o animal, histórico de reprodução e prioridades do criatório."
    },
    {
      num: 2,
      titulo: "Avaliação Inicial",
      descricao: "Analisamos as condições de saúde e o ciclo reprodutivo atual do animal.",
      detalheTecnico: "A equipe veterinária realiza uma triagem clínica detalhada para certificar a aptidão uterina e sanitária da égua."
    },
    {
      num: 3,
      titulo: "Planejamento Técnico",
      descricao: "Definimos a estratégia de sincronização ou o plano médico sob medida.",
      detalheTecnico: "Calculamos a janela ideal para remessa de sêmen ou intervenção clínica com exatidão científica."
    },
    {
      num: 4,
      titulo: "Execução Especializada",
      descricao: "Realizamos o atendimento com acompanhamento e técnica rigorosa.",
      detalheTecnico: "O procedimento é executado no Areão ou em campo. Inclui o diagnóstico confirmatório de prenhez."
    }
  ];

  const depoimentos: Testimonial[] = [
    {
      autor: "Geraldo Mendes",
      propriedade: "Haras Serra de Cuiabá",
      cidade: "Cuiabá - MT",
      texto: "O suporte técnico da InseminaHorse faz toda a diferença. Senti segurança desde o primeiro atendimento e os resultados nos índices de prenhez foram excelentes.",
      estrelas: 5
    },
    {
      autor: "Marcos Vinícius",
      propriedade: "Fazenda Ipê Amarelo",
      cidade: "Sorriso - MT",
      texto: "Finalmente encontrei um serviço de reprodução em Cuiabá que une seriedade técnica com um atendimento próximo e atencioso. Recomendo aos criadores da região.",
      estrelas: 5
    },
    {
      autor: "Cláudio Nunes",
      propriedade: "Criatório Estrela do Sul",
      cidade: "Rondonópolis - MT",
      texto: "Transparência e qualidade. O que mais me agrada é a forma como eles explicam cada etapa da inseminação, trazendo confiança para quem investe em genética.",
      estrelas: 5
    }
  ];

  const faqItems: FAQItem[] = [
    {
      pergunta: "Qual o preço dos serviços de inseminação em Cuiabá?",
      resposta: "Os valores variam conforme o modelo de tratamento (se sêmen congelado, resfriado ou fresco) e a quantidade de animais no plantel. Entre em contato pelo WhatsApp para receber um orçamento personalizado.",
      categoria: "Investimento & Valores"
    },
    {
      pergunta: "Como posso agendar uma consulta ou avaliação reprodutiva?",
      resposta: "O agendamento é feito diretamente pelo nosso WhatsApp oficial. Você escolhe a data ideal e nossa equipe confirma o horário em poucos minutos.",
      categoria: "Agendamento"
    },
    {
      pergunta: "Vocês atendem fazendas e criadores em outras cidades de MT?",
      resposta: "Sim, fornecemos suporte técnico profissional focado em reprodução equina para clientes localizados em todo o estado de Mato Grosso.",
      categoria: "Área de Atuação"
    },
    {
      pergunta: "O atendimento de emergência veterinária equina funciona 24h?",
      resposta: "Sim, o atendimento de emergência veterinária é 24 horas por dia. Já os procedimentos de inseminação e acompanhamento reprodutivo eletivo são realizados estritamente com hora marcada.",
      categoria: "Emergência"
    },
    {
      pergunta: "Quais preparos a égua precisa antes de iniciar a inseminação?",
      resposta: "Recomendamos que a égua passe por uma triagem clínica prévia para avaliar a saúde uterina, sanidade nutricional e acompanhamento do ciclo natural. Nós cuidamos de orientar o passo a passo.",
      categoria: "Manejo Técnico"
    },
    {
      pergunta: "Quais as principais formas de pagamento aceitas?",
      resposta: "Aceitamos Pix, transferências bancárias e parcelamento nos cartões de crédito. Detalhamos as condições ideais junto com o orçamento personalizado.",
      categoria: "Investimento & Valores"
    },
    {
      pergunta: "Qual o principal diferencial da InseminaHorse?",
      resposta: "Nossos pilares de entrega unem alta biotecnologia de fertilização, genética de excelência e transparência constante sobre cada etapa aos criadores.",
      categoria: "Sobre Nós"
    },
    {
      pergunta: "Como chego ao centro veterinário no Areão em Cuiabá?",
      resposta: "Estamos localizados na Avenida João Eugênio Gonçalves Pinheiro, 410 - Bairro Areão, Cuiabá - MT. É uma área de fácil acesso com espaço para trânsito seguro de veículos e cavalos.",
      categoria: "Localização"
    }
  ];

  // Simulator Logic
  const simulaResultados = useMemo(() => {
    // Calculo básico de melhoria de prenhez
    // Monta natural estima-se 40% a 50% de taxa por ciclo se não controlado
    // Inseminação assistida por nós estima-se 75% a 85% de taxa por ciclo
    const taxaBase = metodoAtual === 'monta_natural' ? 0.45 : 0.60;
    const taxaAssistida = 0.82; // Nosso indice médio

    const prenhezesBase = Math.round(numEguas * taxaBase);
    const prenhezesAssistidas = Math.round(numEguas * taxaAssistida);
    const ciclosPerdidosReduzidos = Math.max(1, Math.round((numEguas - prenhezesBase) * 1.5));
    const economiaSemenEstimativa = Math.round(numEguas * 1.2 * 150); // Média de R$ 150 de economia estimada por ciclo poupado

    return {
      prenhezesBase,
      prenhezesAssistidas,
      ganhoPrenhez: prenhezesAssistidas - prenhezesBase,
      ciclosPerdidosReduzidos,
      economiaSemenEstimativa
    };
  }, [numEguas, metodoAtual]);

  // Handle WhatsApp presets
  const handleWAClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const filteredFaqs = useMemo(() => {
    if (!faqSearch) return faqItems;
    return faqItems.filter(item => 
      item.pergunta.toLowerCase().includes(faqSearch.toLowerCase()) || 
      item.resposta.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.categoria.toLowerCase().includes(faqSearch.toLowerCase())
    );
  }, [faqSearch]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#111827] flex flex-col selection:bg-[#4da768] selection:text-white">
      
      {/* Top Banner Informativo */}
      <div className="bg-[#4da768] text-white py-2 px-4 text-xs font-semibold sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-emerald-800">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <span className="flex items-center gap-1.5 justify-center">
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            Cuiabá, Mato Grosso - Atendimento em todo o estado
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-300" />
            Inseminação: Com Hora Marcada | Emergência: 24 horas
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${WHATSAPP_NUMBER}`}
            className="hover:text-emerald-300 transition-colors flex items-center gap-1 justify-center"
          >
            <Phone className="w-3.5 h-3.5" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Header Sticky Principal */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo / Nome */}
          <a href="#hero" className="flex items-center gap-3.5 group">
            <img 
              src={inseminahorseGreenLogoUrl} 
              alt="InseminaHorse Logo" 
              className="w-16 h-16 object-cover rounded-xl shadow-md border border-gray-100 group-hover:scale-105 transition-transform duration-350 bg-white" 
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="text-2xl font-black tracking-tight text-[#4da768] block">InseminaHorse</span>
              <span className="text-[11px] font-bold text-[#808080] uppercase tracking-wider block -mt-1.5">Reprodução Equina</span>
            </div>
          </a>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-[#808080]">
            <a href="#sobre" className="hover:text-[#4da768] transition-colors py-2">Sobre</a>
            <a href="#servicos" className="hover:text-[#4da768] transition-colors py-2">Serviços</a>
            <a href="#calculador" className="hover:text-[#4da768] transition-colors py-2">Simulador</a>
            <a href="#beneficios" className="hover:text-[#4da768] transition-colors py-2">Benefícios</a>
            <a href="#como-funciona" className="hover:text-[#4da768] transition-colors py-2">Processo</a>
            <a href="#depoimentos" className="hover:text-[#4da768] transition-colors py-2">Depoimentos</a>
            <a href="#faq" className="hover:text-[#4da768] transition-colors py-2">Dúvidas</a>
            <a href="#area-atuacao" className="hover:text-[#4da768] transition-colors py-2">Localização</a>
          </nav>

          {/* CTA Header Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header_cta"
              onClick={() => handleWAClick("Olá, gostaria de falar com um especialista sobre reprodução equina!")}
              className="bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-bold py-2.5 px-5 rounded-lg shadow-sm text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.007 0-3.971-.51-5.713-1.472l-6.28 1.69zm6.214-4.083l.345.205c1.428.848 3.084 1.296 4.781 1.296 4.964 0 9.011-4.048 9.011-9.011 0-2.404-.936-4.664-2.634-6.363-1.699-1.7-3.96-2.636-6.364-2.636-4.963 0-9.011 4.047-9.011 9.011 0 1.776.52 3.513 1.503 5.025l.225.346-1.003 3.666 3.748-.978z" />
              </svg>
              Falar no WhatsApp
            </button>
          </div>

          {/* Hamburguer Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#4da768] p-2 focus:outline-none"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-3 px-4 space-y-2 shadow-inner">
            <a
              href="#sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-[#111827] font-semibold rounded hover:bg-gray-50 transition-colors"
            >
              Sobre
            </a>
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-[#111827] font-semibold rounded hover:bg-gray-50 transition-colors"
            >
              Serviços
            </a>
            <a
              href="#calculador"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-[#111827] font-semibold rounded hover:bg-gray-50 transition-colors"
            >
              Simulador
            </a>
            <a
              href="#beneficios"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-[#111827] font-semibold rounded hover:bg-gray-50 transition-colors"
            >
              Benefícios
            </a>
            <a
              href="#como-funciona"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-[#111827] font-semibold rounded hover:bg-gray-50 transition-colors"
            >
              Processo
            </a>
            <a
              href="#depoimentos"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-[#111827] font-semibold rounded hover:bg-gray-50 transition-colors"
            >
              Depoimentos
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-[#111827] font-semibold rounded hover:bg-gray-50 transition-colors"
            >
              Dúvidas
            </a>
            <a
              href="#area-atuacao"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-[#111827] font-semibold rounded hover:bg-gray-50 transition-colors"
            >
              Localização
            </a>
            
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWAClick("Olá! Gostaria de falar com a equipe técnica da InseminaHorse.");
                }}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-lg shadow inline-flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.007 0-3.971-.51-5.713-1.472l-6.28 1.69zm6.214-4.083l.345.205c1.428.848 3.084 1.296 4.781 1.296 4.964 0 9.011-4.048 9.011-9.011 0-2.404-.936-4.664-2.634-6.363-1.699-1.7-3.96-2.636-6.364-2.636-4.963 0-9.011 4.047-9.011 9.011 0 1.776.52 3.513 1.503 5.025l.225.346-1.003 3.666 3.748-.978z" />
                </svg>
                Agendar pelo WhatsApp
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 1. Hero Section (#hero) */}
      <section id="hero" className="bg-gradient-to-b from-white to-[#F4FBF7] border-b border-gray-100 relative overflow-hidden py-12 lg:py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo - Conteúdo Principal com a Foto de Fundo mostrando os Dois Cavalos */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left relative overflow-hidden rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 lg:p-12 min-h-[500px]" id="hero_content">
            {/* Imagem de Fundo Interna do Bloco de Texto */}
            <div className="absolute inset-0 z-0">
              <img 
                src={heroBackgroundPalominoUrl} 
                alt="Égua palomina e potro da InseminaHorse" 
                className="w-full h-full object-cover object-right sm:object-center select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              {/* Degradê que deixa os cavalos visíveis à direita/centro e garante legibilidade do texto à esquerda */}
              <div className="absolute inset-0 bg-white/80 sm:bg-white/75 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/80 lg:to-white/10" />
            </div>

            {/* Conteúdo com Z-Index para ficar acima do plano de fundo */}
            <div className="relative z-10">
              <span className="inline-flex self-start py-1 px-3 mb-5 text-[10px] font-extrabold tracking-[0.2em] text-[#347d4b] bg-white/95 backdrop-blur-xs border border-emerald-100 shadow-sm rounded-full uppercase">
                Referência em Mato Grosso
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.15] text-[#111827] mb-6">
                Inseminação Equina em Cuiabá: <span className="text-[#3a8b54] block sm:inline">Excelência em Reprodução</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed mb-8 max-w-xl bg-white/60 backdrop-blur-xs p-3 rounded-xl border border-white/40">
                Elevamos o potencial genético do seu plantel com tecnologia de ponta e suporte especializado em Mato Grosso. Oferecemos segurança e os melhores índices de prenhez para criadores que não abrem mão da qualidade.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => handleWAClick("Olá! Quero conhecer mais sobre a Inseminação Equina em Cuiabá e saber os detalhes de suporte veterinário.")}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl shadow-lg shadow-green-500/10 hover:scale-[1.02] active:scale-95 transition-all text-base cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.007 0-3.971-.51-5.713-1.472l-6.28 1.69zm6.214-4.083l.345.205c1.428.848 3.084 1.296 4.781 1.296 4.964 0 9.011-4.048 9.011-9.011 0-2.404-.936-4.664-2.634-6.363-1.699-1.7-3.96-2.636-6.364-2.636-4.963 0-9.011 4.047-9.011 9.011 0 1.776.52 3.513 1.503 5.025l.225.346-1.003 3.666 3.748-.978z" />
                  </svg>
                  Falar no WhatsApp
                </button>
                <a
                  href="#servicos"
                  className="px-8 py-4 border-2 border-[#4da768] bg-white/95 hover:bg-emerald-50 text-[#4da768] font-bold rounded-xl text-center shadow-xs transition-all text-base flex items-center justify-center gap-2"
                >
                  Conhecer nossos serviços
                </a>
              </div>
              
              <p className="mt-5 text-xs font-extrabold text-[#347d4b] bg-white/90 shadow-sm border border-emerald-100/60 inline-block px-3 py-1.5 rounded-lg">
                * Atendimento técnico especializado para equinos e bovinos.
              </p>
            </div>
          </div>

          {/* Lado Direito - Ilustração Física / Painel de Especialidades Estilo Premium */}
          <div className="lg:col-span-5 flex flex-col gap-6" id="hero_secondary_card">
            
            {/* Foto de Destaque Símbolo da Reprodução com Égua e Potro */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-md bg-white group select-none">
              <img 
                src={successResultBannerUrl} 
                alt="Caso de Sucesso - Égua Paint Horse e Potro saudável" 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow border border-emerald-50 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">
                Resultado de Sucesso
              </div>
            </div>

            {/* Bloco de Destaques Rápidos de Especialidade */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-50 text-[#4da768] rounded-lg">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-[#4da768] tracking-tight">Especialidades e Procedimentos</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">Inseminação Artificial</span>
                  <span className="text-xs py-1 px-2.5 bg-green-50 text-green-700 font-bold rounded-full">Atendimento imediato</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">Ultrassonografia Folicular</span>
                  <span className="text-xs py-1 px-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-full">Alta precisão</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">Laudos Cláusticos & Andrológicos</span>
                  <span className="text-xs py-1 px-2.5 bg-gray-50 text-gray-700 font-bold rounded-full font-mono">Disponíveis</span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-sm font-semibold text-gray-800">Suporte de Emergência Equina</span>
                  <span className="text-xs py-1 px-2.5 bg-red-50 text-red-700 font-bold rounded-full">Acionamento 24h</span>
                </div>
              </div>

              {/* Endereço / Contato Rápido no Bloco */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-start gap-3 text-xs text-gray-600">
                  <MapPin className="w-4 h-4 text-[#4da768] shrink-0 mt-0.5" />
                  <span>Av. João Eugênio Gonçalves Pinheiro, 410 - Areão, Cuiabá - MT</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <Clock className="w-4 h-4 text-[#4da768] shrink-0" />
                  <span>Inseminação: Com Hora Marcada | Emergência: 24 horas</span>
                </div>
              </div>
            </div>

            {/* Badge de Aprovação Técnico / Social */}
            <div className="bg-[#4da768]/5 rounded-xl border border-[#4da768]/10 p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#4da768] rounded-lg flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#4da768] uppercase tracking-wider">Atuação Segura</p>
                <p className="text-xs text-gray-600">Alta taxa de sucesso ginecológico e estrita biossegurança animal.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Barra de Credibilidade (#credibilidade) */}
      <section id="credibilidade" className="bg-[#4da768] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="flex items-start gap-4 p-2">
              <div className="p-3 bg-white/10 rounded-xl text-emerald-300">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Genética de Elite</h3>
                <p className="text-xs text-emerald-100/85">Foco em maximizar o potencial reprodutivo do seu animal com excelência.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-2">
              <div className="p-3 bg-white/10 rounded-xl text-emerald-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Suporte Técnico</h3>
                <p className="text-xs text-emerald-100/85">Acompanhamento de ponta a ponta feito lado a lado com o criador.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-2">
              <div className="p-3 bg-white/10 rounded-xl text-emerald-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Tecnologia Avançada</h3>
                <p className="text-xs text-emerald-100/85">Biotecnologias e exames de imagem que elevam os índices de prenhez.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-2">
              <div className="p-3 bg-white/10 rounded-xl text-emerald-300">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">Atendimento Especializado</h3>
                <p className="text-xs text-emerald-100/85">Veterinários dedicados integralmente à saúde e bem-estar animal.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Seção "Quem Somos" (#sobre) */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Lado Esquerdo - Mensagem Principal */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#4da768] bg-[#4da76810] py-1.5 px-3 rounded-full uppercase">
                Conectando Ciência e Tradição
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
                Conheça a InseminaHorse
              </h2>
              <p className="text-base sm:text-lg text-[#111827] font-medium leading-relaxed">
                Somos um centro veterinário focado em reprodução equina, servindo criadores de todo o estado do Mato Grosso com precisão técnica e um atendimento acolhedor. Nossa missão é unir ciência e cuidado para garantir resultados superiores no manejo reprodutivo.
              </p>
              <p className="text-base text-[#808080] leading-relaxed">
                Entendemos profundamente os desafios dos criadores e trabalhamos sem descanso para oferecer soluções que tragam segurança, previsibilidade e tranquilidade em cada etapa do ciclo. Se você busca uma parceria séria focada no ganho genético, a InseminaHorse é sua verdadeira aliada no campo e na cidade.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <a
                  href="#contato"
                  className="bg-[#4da768] text-white hover:bg-opacity-90 font-bold px-8 py-3 rounded-lg shadow-md transition-all text-center"
                >
                  Fale Conosco
                </a>
                <a
                  href="#servicos"
                  className="text-gray-700 hover:text-[#4da768] font-bold py-3 px-4 text-center transition-all inline-flex items-center justify-center gap-2"
                >
                  Ver Especialidades
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Lado Direito - Cards de Visão Geral / Dados e Estatísticas */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              
              <div className="bg-[#F9FAFB] border border-gray-100 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-gray-200/50 transition-all">
                <div className="w-10 h-10 bg-emerald-50 text-[#4da768] rounded-lg flex items-center justify-center mb-6">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-[#4da768] mb-1">15+</p>
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Anos de Experiência</p>
                  <p className="text-xs text-gray-500">No mercado de manejo reprodutivo equino.</p>
                </div>
              </div>

              <div className="bg-[#F9FAFB] border border-gray-100 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-gray-200/50 transition-all">
                <div className="w-10 h-10 bg-green-50 text-green-700 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-[#4da768] mb-1">82%</p>
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Índice Médio</p>
                  <p className="text-xs text-gray-500">De prenhez ginecológica assistida por ciclo estral.</p>
                </div>
              </div>

              <div className="bg-[#F9FAFB] border border-gray-100 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-gray-200/50 transition-all col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-emerald-50 text-[#4da768] rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wider">Abrangência Territorial</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 mb-1">Atendimento em Todo Estado</p>
                  <p className="text-xs text-gray-500">De Cuiabá até as fazendas mais distantes do Mato Grosso.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Seção de Serviços (#servicos) */}
      <section id="servicos" className="py-20 bg-[#F9FAFB] border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#4da768] bg-[#4da76810] py-1 px-3 rounded-full uppercase">
              O que Fazemos Com Maestria
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
              Nossos Serviços Veterinários Especializados
            </h2>
            <p className="text-base text-[#808080]">
              Dispomos de soluções completas de reprodução assistida, diagnósticos precisos e suporte ágil de urgência para equinos de alta performance genômica.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {servicos.map((servico, idx) => (
              <div 
                key={servico.slug}
                className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden"
              >
                {/* Imagem do Serviço */}
                {servico.imagem && (
                  <div className="h-48 overflow-hidden relative group">
                    <img 
                      src={servico.imagem} 
                      alt={servico.nome} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-[#4da768]" />
                  </div>
                )}
                {!servico.imagem && <div className="h-2 bg-[#4da768]" />}
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#808080] block font-mono">
                      Serviço {idx + 1}
                    </span>
                    <span className="text-xs font-semibold py-1 px-2 bg-[#4da768]/5 text-[#4da768] rounded">
                      {servico.duracaoEstimada}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111827] mb-3">
                    {servico.nome}
                  </h3>
                  
                  <p className="text-sm text-[#808080] leading-relaxed mb-6">
                    {servico.descricao}
                  </p>

                  <div className="space-y-2.5 mt-auto pt-6 border-t border-gray-100 mb-8">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Procedimentos Incluídos:</p>
                    {servico.detalhes.map((det) => (
                      <div key={det} className="flex items-start gap-2.5 text-xs text-gray-600">
                        <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                        <span>{det}</span>
                      </div>
                    ))}
                  </div>

                  {/* Accordion timeline indicator for interactive breeding preparation */}
                  <div className="mb-6">
                    <button
                      onClick={() => setSelectedServiceTimeline(selectedServiceTimeline === servico.slug ? null : servico.slug)}
                      className="w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded text-left text-xs font-semibold text-[#4da768] flex justify-between items-center transition-all border border-gray-200/50"
                    >
                      <span>📋 Checklist de Preparo do Animal</span>
                      {selectedServiceTimeline === servico.slug ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {selectedServiceTimeline === servico.slug && (
                      <div className="mt-2.5 p-3 rounded bg-[#4da768]/5 border border-[#4da768]/15 text-xs text-gray-700 space-y-2 leading-relaxed animate-fadeIn">
                        {servico.slug === 'inseminacao-equina' && (
                          <>
                            <p><strong>1. Avaliação Ginecológica:</strong> Realizar ultrassonografia para descartar endometrite ou cistos uterinos.</p>
                            <p><strong>2. Sanidade do Semen:</strong> Combinar a janela de envio com a central reprodutora do garanhão escolhido.</p>
                            <p><strong>3. Monitoramento Luteal:</strong> Acompanhar até o diâmetro folicular superior a 35mm para indução segura.</p>
                          </>
                        )}
                        {servico.slug === 'emergencia-equina' && (
                          <>
                            <p><strong>1. Ligue Imediatamente:</strong> Ligue ou mande áudio relatando sintomas exatos (parâmetros de mucosas, dor mecânica).</p>
                            <p><strong>2. Manejo Preventivo:</strong> Evite que o animal role excessivamente em casos de suspeita de cólica.</p>
                            <p><strong>3. Local de Acesso:</strong> Deixe o piquete desimpedido para agilizar a entrada da viatura veterinária.</p>
                          </>
                        )}
                        {servico.slug === 'exames-veterinarios' && (
                          <>
                            <p><strong>1. Documentação:</strong> Manter a carteira de exames oficiais (GAA, Mormo, Anemia) em dia.</p>
                            <p><strong>2. Contenção Adequada:</strong> Garantir que o tronco de contenção física esteja limpo e sombreado.</p>
                            <p><strong>3. Histórico Reprodutivo:</strong> Ter em mãos as datas do último parto e das últimas coberturas.</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleWAClick(`Olá, gostaria de saber mais informações e orçamentos do serviço de "${servico.nome}" em Cuiabá.`)}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:translate-y-0.5 transition-all text-sm cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.007 0-3.971-.51-5.713-1.472l-6.28 1.69zm6.214-4.083l.345.205c1.428.848 3.084 1.296 4.781 1.296 4.964 0 9.011-4.048 9.011-9.011 0-2.404-.936-4.664-2.634-6.363-1.699-1.7-3.96-2.636-6.364-2.636-4.963 0-9.011 4.047-9.011 9.011 0 1.776.52 3.513 1.503 5.025l.225.346-1.003 3.666 3.748-.978z" />
                    </svg>
                    Falar no WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-white p-6 sm:p-8 rounded-2xl border border-gray-150 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <p className="text-base font-bold text-[#111827]">Precisa de uma solução customizada para o seu criatório?</p>
              <p className="text-sm text-[#808080]">Fale conosco e alinhe as datas de remessas e sêmen com o nosso especialista.</p>
            </div>
            <button
              onClick={() => handleWAClick("Olá! Gostaria de falar com o sênior consultor em reprodução de equinos para avaliar meu plantel personalizado.")}
              className="bg-[#4da768] hover:bg-opacity-90 text-white font-bold py-3.5 px-6 rounded-lg shadow-md inline-flex items-center gap-2 group shrink-0 transition-opacity cursor-pointer"
            >
              Falar com o Especialista
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* Interactive Tool: Simulador de Eficiência Reprodutiva (#calculador) */}
      <section id="calculador" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#4da768] bg-emerald-50 py-1 px-3 rounded-full uppercase">
              Ferramenta Prática do Criador
            </span>
            <h2 className="text-3xl font-extrabold text-[#111827]">
              Simulador de Eficiência Reprodutiva
            </h2>
            <p className="text-sm text-[#808080]">
              Estime o ganho clínico e a redução de ciclos perdidos simulando a assistência tecnológica da InseminaHorse baseada no histórico de seu plantel.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
            
            {/* Esquerdo: Inputs */}
            <div className="p-8 md:col-span-6 bg-gray-50 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#4da768] mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Dados do Plantel
                </h3>

                <div className="space-y-6">
                  {/* Número de éguas */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-700">Quantidade de Éguas</label>
                      <span className="text-sm font-bold text-[#4da768] px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 rounded font-mono">
                        {numEguas} fêmeas
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={numEguas}
                      onChange={(e) => setNumEguas(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4da768]"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">
                      <span>1 égua</span>
                      <span>50 éguas</span>
                      <span>100 éguas</span>
                    </div>
                  </div>

                  {/* Método atual */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2.5">Método de Reprodução Atual</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setMetodoAtual('monta_natural')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition-all ${metodoAtual === 'monta_natural' ? 'bg-[#4da768]/10 border-[#4da768] text-[#4da768]' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                      >
                        ⚡ Monta Natural Desassistida
                      </button>
                      <button
                        type="button"
                        onClick={() => setMetodoAtual('inseminacao_simples')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition-all ${metodoAtual === 'inseminacao_simples' ? 'bg-[#4da768]/10 border-[#4da768] text-[#4da768]' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                      >
                        🧬 Inseminação sem Acompanhamento
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 block">
                <p className="text-xs text-gray-500 leading-relaxed">
                  *Este simulador estatístico utiliza referências da literatura veterinária nacional e dados internos de prontuários ginecológicos da InseminaHorse Cuiabá para o cálculo prognóstico.
                </p>
              </div>
            </div>

            {/* Direito: Resultados */}
            <div className="p-8 md:col-span-6 bg-white flex flex-col justify-between border-l border-gray-100">
              
              <div>
                <h3 className="text-lg font-bold text-gray-950 mb-6 font-sans">
                  Projeção de Sucesso Clínico
                </h3>

                <div className="space-y-6">
                  
                  {/* Comparador de Prenhez */}
                  <div className="p-4 bg-gray-50 rounded-xl relative overflow-hidden flex justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">Método Atual (Estimado)</span>
                      <span className="text-2xl font-black text-gray-700 font-mono block">{simulaResultados.prenhezesBase} gestações</span>
                    </div>
                    <div className="border-l border-gray-200 my-1" />
                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#4da768] uppercase tracking-wider block">Com InseminaHorse</span>
                      <span className="text-2xl font-black text-[#4da768] font-mono block">{simulaResultados.prenhezesAssistidas} gestações</span>
                    </div>
                  </div>

                  {/* Detalhes de ganho */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Foals adicionais esperados:</span>
                      <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded text-xs font-mono">
                        +{simulaResultados.ganhoPrenhez} potro(s) de alta genética
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Ciclos perdidos evitados:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-mono">
                        ~{simulaResultados.ciclosPerdidosReduzidos} ciclos foliculares salvos
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm py-1">
                      <span className="text-gray-600 font-medium">Economia estimada em manejo/sêmen:</span>
                      <span className="font-bold text-gray-900 font-mono">
                        R$ {simulaResultados.economiaSemenEstimativa.toLocaleString('pt-BR')},00
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => handleWAClick(`Olá! Realizei a simulação no site para um plantel de ${numEguas} éguas sob o método (${metodoAtual === 'monta_natural' ? 'Monta Natural' : 'Inseminação Simples'}). Projetou-se +${simulaResultados.ganhoPrenhez} potros extras com a equipe da InseminaHorse. Gostaria de solicitar um diagnóstico de campo.`)}
                  className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl shadow-lg shadow-green-500/10 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:translate-y-0.5 text-base cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.007 0-3.971-.51-5.713-1.472l-6.28 1.69zm6.214-4.083l.345.205c1.428.848 3.084 1.296 4.781 1.296 4.964 0 9.011-4.048 9.011-9.011 0-2.404-.936-4.664-2.634-6.363-1.699-1.7-3.96-2.636-6.364-2.636-4.963 0-9.011 4.047-9.011 9.011 0 1.776.52 3.513 1.503 5.025l.225.346-1.003 3.666 3.748-.978z" />
                  </svg>
                  Solicitar Diagnóstico no WhatsApp
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Seção de Benefícios / Por que nos escolher (#beneficios) */}
      <section id="beneficios" className="py-20 bg-[#F9FAFB] border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Esquerda: Conteúdo texto principal */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#4da768] bg-[#4da76810] py-1 px-3 rounded-full uppercase">
                Vantagens do Plantel
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
                Por que escolher a InseminaHorse?
              </h2>
              <p className="text-base text-[#808080] leading-relaxed">
                Cada criatório possui uma meta, mas a saúde dos equinos e a eficiência reprodutiva são prioridades universais. Descubra os diferenciais técnicos reais que consolidaram nossa liderança em Mato Grosso.
              </p>
              
              <div className="pt-4">
                <button
                  onClick={() => handleWAClick("Olá, gostaria de entender as vantagens específicas de reprodução equina para meu rancho com a InseminaHorse.")}
                  className="bg-[#4da768] hover:bg-opacity-90 font-bold text-white px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-opacity"
                >
                  Falar Conosco
                </button>
              </div>
            </div>

            {/* Direita: Grid de Diferenciais */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-emerald-50 text-[#4da768] rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#111827] mb-2">Genética de Excelência</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Selecionamos as melhores práticas tecnológicas para garantir a transmissão do potencial superior de garanhões e doadoras ao seu plantel.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-emerald-50 text-[#4da768] rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#111827] mb-2">Suporte Técnico Especializado</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Nossa experiente equipe ginecológica acompanha presencial ou remotamente todo o processo reprodutivo lado a lado com o criador.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-emerald-50 text-[#4da768] rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#111827] mb-2">Tecnologia e Resultados</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Utilizamos métodos testados em centros globais que potencializam sistematicamente os índices de prenhez de forma ética e segura.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-emerald-50 text-[#4da768] rounded-lg flex items-center justify-center mb-4">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#111827] mb-2">Atendimento Acolhedor</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Tratamos o seu animal, os seus prazos e o seu projeto reprodutivo com o máximo de zelo, atenção, rigor e respeito.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. Como Funciona / Processo (#como-funciona) */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#4da768] bg-[#4da76810] py-1 px-3 rounded-full uppercase">
              Fluxo Sem Complicações
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
              Nosso atendimento em 4 passos
            </h2>
            <p className="text-sm text-[#808080]">
              Tornamos a reprodução assistida equina o mais planejada e previsível possível. Veja como coordenamos as agendas técnicas com o criador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {etapas.map((etapa, idx) => (
              <div 
                key={etapa.num}
                className="bg-white p-6 rounded-xl border border-gray-150 relative shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-4xl font-black text-[#4da768]/10 font-mono group-hover:text-[#4da768]/30 transition-colors">
                      0{etapa.num}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4da768]" />
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {etapa.titulo}
                  </h3>
                  
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {etapa.descricao}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 block">
                  <p className="text-[11px] font-semibold text-[#808080] italic leading-tight">
                    💡 {etapa.detalheTecnico}
                  </p>
                </div>
              </div>
            ))}

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => handleWAClick("Olá! Quero dar o Passo 1 e agendar uma Inseminação Equina por WhatsApp.")}
              className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl shadow-lg shadow-green-500/10 inline-flex items-center gap-2 hover:scale-[1.01] active:translate-y-0.5 transition-all cursor-pointer"
            >
              Iniciar Passo 1 agora no WhatsApp
            </button>
          </div>

        </div>
      </section>

      {/* 7. Prova Social / Depoimentos (#depoimentos) */}
      <section id="depoimentos" className="py-20 bg-[#F9FAFB] border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#4da768] bg-[#4da76810] py-1 px-3 rounded-full uppercase">
              Opinião de Quem Entende do Campo
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
              O que nossos clientes dizem
            </h2>
            <p className="text-sm text-[#808080]">
              Criadores renomados e cabanhas do Mato Grosso que confiam a genética de elite de seus cavalos e potros aos cuidados da InseminaHorse.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {depoimentos.map((depo, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-gray-150 p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: depo.estrelas }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-sm text-gray-700 italic leading-relaxed mb-6 font-medium">
                    "{depo.texto}"
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#111827]">{depo.autor}</p>
                    <p className="text-xs text-gray-500">{depo.propriedade}</p>
                  </div>
                  <span className="text-[10px] font-bold py-1 px-2.5 bg-emerald-50 text-[#4da768] rounded-full">
                    {depo.cidade}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chamado de satisfação técnica legal */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              🛡️ Alta taxa de satisfação e estrito compromisso com a transparência de valores.
            </p>
          </div>

        </div>
      </section>

      {/* 8. Bloco SEO Local / Área de Atuação (#area-atuacao) */}
      <section id="area-atuacao" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Lado Esquerdo - Detalhes Locais */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#4da768] bg-[#4da76810] py-1 px-3 rounded-full uppercase">
                Base Operacional em MT
              </span>
              <h2 className="text-3xl font-extrabold text-[#111827]">
                Referência em Reprodução Equina em Cuiabá
              </h2>
              <p className="text-sm sm:text-base text-[#808080] leading-relaxed">
                A InseminaHorse atua estrategicamente no estado do Mato Grosso, com sede localizada no bairro Areão, em Cuiabá. Somos especialistas em oferecer atendimento veterinário de alta qualidade para criadores que buscam resultados consistentes.
              </p>
              
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-3.5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#4da768] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-850 uppercase tracking-wider">Endereço de Atendimento</p>
                    <p className="text-sm text-gray-600">{CLINIC_ADDRESS}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#4da768] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-850 uppercase tracking-wider">Horários e Contato Rápido</p>
                    <p className="text-sm text-gray-600">Inseminação: Com Hora Marcada | Emergências: 24 horas via WhatsApp no telefone {PHONE_DISPLAY}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-[#4da768] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-850 uppercase tracking-wider">Polo Geográfico</p>
                    <p className="text-sm text-gray-600">Proximidades da região central de Cuiabá e saída facilitada para as principais rodovias do MT (BR-163 / BR-364 / MT-040).</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleWAClick(`Olá! Como faço para chegar ao centro no Areão Cuiabá na Av João Eugênio? Precisava agendar para levar meu cavalo.`)}
                  className="px-6 py-3 bg-[#4da768] hover:bg-opacity-90 text-white font-bold rounded-lg text-sm text-center shadow transition-all cursor-pointer"
                >
                  Pegar Instruções de Rota
                </button>
                <a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-lg text-center transition-all flex items-center justify-center gap-2"
                >
                  Ligar para {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Lado Direito - Placeholder de Mapa Profissional */}
            <div className="lg:col-span-6 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative shadow-lg h-[400px]">
              
              {/* Simulated Map Visual Vector Rendering */}
              <div className="absolute inset-0 bg-[#E0ECEB] flex flex-col items-center justify-center p-4">
                
                {/* Visual stylings for grid roads */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                
                {/* Simulated Road Lines */}
                <div className="absolute h-6 bg-white border-t border-b border-gray-300 w-full top-1/3 left-0 transform -rotate-12 flex items-center justify-center text-[9px] text-gray-400 font-bold uppercase tracking-widest select-none">
                  Avenida Fernando Corrêa da Costa
                </div>
                <div className="absolute w-8 bg-white border-l border-r border-gray-300 h-full left-1/4 top-0 flex items-center justify-center text-[9px] text-gray-400 font-bold uppercase tracking-widest select-none [writing-mode:vertical-lr]">
                  Av. General Mello
                </div>
                <div className="absolute h-8 bg-white border-t border-b border-gray-300 w-full bottom-1/4 left-0 flex items-center justify-center text-[9px] text-gray-400 font-bold uppercase tracking-widest select-none">
                  Av. João Eugênio Gonçalves Pinheiro (Areão)
                </div>

                {/* Simulated River */}
                <div className="absolute w-12 bg-emerald-200/60 h-full right-8 top-0 -rotate-6 blur-[1px]" />

                {/* Map Marker Pin */}
                <div className="relative z-10 flex flex-col items-center bg-white p-4 rounded-xl shadow-xl border border-gray-200/60 max-w-xs text-center">
                  <div className="w-12 h-12 bg-[#4da768] rounded-full flex items-center justify-center text-white mb-2 shadow-lg shadow-emerald-800/40 relative animate-bounce">
                    <MapPin className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-[#4da768] uppercase tracking-wider mb-0.5">Sede InseminaHorse</h4>
                  <p className="text-[10px] text-gray-500 font-medium">Av. João Eugênio Gonçalves Pinheiro, 410</p>
                  <p className="text-[9px] text-gray-400 font-bold font-mono">Bairro Areão - Cuiabá / MT</p>
                  
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[10px] text-green-700 font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Fácil acesso para carretas</span>
                  </div>
                </div>

                {/* Map Details Card Overlay on bottom */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded border border-gray-200 text-[10px] font-semibold text-gray-600">
                  📍 GPS: -15.603342, -56.079219
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FAQ Estratégico (#faq) */}
      <section id="faq" className="py-20 bg-[#F9FAFB] border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#4da768] bg-[#4da76810] py-1 px-3 rounded-full uppercase">
              Esclareça Suas Dúvidas
            </span>
            <h2 className="text-3xl font-extrabold text-[#111827]">
              FAQ Estratégico de Reprodução Equina
            </h2>
            <p className="text-sm text-[#808080]">
              Perguntas frequentes sobre biotecnologia folicular, cronogramas de atendimento em Cuiabá e as melhores práticas para criadores de cavalos em Mato Grosso.
            </p>
          </div>

          {/* FAQ Search Bar element */}
          <div className="mb-8 relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Digite sua dúvida (ex: preço, emergência, égua, exames...)"
              className="w-full text-sm pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#4da768] transition-all shadow-sm"
            />
            {faqSearch && (
              <button 
                onClick={() => setFaqSearch('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-600"
              >
                Limpar
              </button>
            )}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const originalIndex = faqItems.findIndex(i => i.pergunta === faq.pergunta);
                const isOpen = activeFaq === originalIndex;
                
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl border border-gray-150 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(originalIndex)}
                      className="w-full text-left py-4 px-5 sm:px-6 font-semibold text-sm text-[#111827] flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-[#4da768] font-mono rounded font-bold uppercase shrink-0">
                          {faq.categoria}
                        </span>
                        <span>{faq.pergunta}</span>
                      </span>
                      {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="p-5 sm:p-6 border-t border-gray-100 text-xs sm:text-sm text-gray-600 bg-gray-50 leading-relaxed animate-fadeIn">
                        {faq.resposta}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center p-8 bg-white rounded-xl border border-gray-200">
                <AlertCircle className="w-8 h-8 text-[#4da768] mx-auto mb-2" />
                <p className="text-sm font-bold text-[#111827]">Nenhuma resposta encontrada para "{faqSearch}".</p>
                <p className="text-xs text-gray-500 mt-1">Gostaria de falar direto com o veterinário no WhatsApp?</p>
                <button
                  onClick={() => handleWAClick(`Olá! Tive a seguinte dúvida que não encontrei no FAQ do site: "${faqSearch}". Vocês podem me responder?`)}
                  className="mt-4 bg-[#25D366] text-white hover:bg-[#20ba59] px-5 py-2 rounded-lg text-xs font-bold shadow-md cursor-pointer transition-opacity"
                >
                  Falar no WhatsApp
                </button>
              </div>
            )}
          </div>

          <div className="mt-10 p-5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-xs font-bold text-[#4da768] uppercase tracking-wider">Ainda com alguma dúvida reprodutiva?</p>
              <p className="text-xs text-gray-500">Estamos de prontidão técnica para ajudar você com laudos e consultas ginecológicas.</p>
            </div>
            <button
              onClick={() => handleWAClick("Olá, estou com uma dúvida reprodutiva em meu animal e gostaria de orientação rápida de um médico veterinário.")}
              className="bg-[#4da768] text-white hover:bg-opacity-90 font-bold px-4 py-2 rounded text-xs shadow cursor-pointer transition-opacity shrink-0"
            >
              Conversar com Veterinário
            </button>
          </div>

        </div>
      </section>

      {/* 10. CTA Final / Contato (#contato) */}
      <section id="contato" className="py-20 bg-[#4da768] text-white relative overflow-hidden">
        
        {/* Simulated subtle vector line styling background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-[#4da768] to-[#09170c] -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          <span className="inline-flex py-1.5 px-3 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-200">
            Fale Conosco Hoje Mesmo
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
            Pronto para elevar o nível da sua criação?
          </h2>
          
          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto">
            Nossa equipe está de prontidão técnica em Cuiabá para sanar todas as suas dúvidas e planejar o melhor caminho estratégico para o sucesso reprodutivo do seu animal. Respondemos em até 30 minutos via WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-lg mx-auto pt-4">
            <button
              onClick={() => handleWAClick(`Olá, estou pronto para iniciar o planejamento reprodutivo do meu plantel de cavalos com a equipe InseminaHorse de Cuiabá.`)}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-green-500/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] text-base cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.007 0-3.971-.51-5.713-1.472l-6.28 1.69zm6.214-4.083l.345.205c1.428.848 3.084 1.296 4.781 1.296 4.964 0 9.011-4.048 9.011-9.011 0-2.404-.936-4.664-2.634-6.363-1.699-1.7-3.96-2.636-6.364-2.636-4.963 0-9.011 4.047-9.011 9.011 0 1.776.52 3.513 1.503 5.025l.225.346-1.003 3.666 3.748-.978z" />
              </svg>
              Falar no WhatsApp (65 99695-9592)
            </button>
            
            <a
              href={`tel:${WHATSAPP_NUMBER}`}
              className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/25 text-white font-bold rounded-xl transition-all hover:scale-[1.02] text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4.5 h-4.5" />
              Ligar para {PHONE_DISPLAY}
            </a>
          </div>

          <p className="text-xs text-emerald-200/80 font-semibold tracking-wider italic pt-2">
            * Retorno de atendimento estimado em menos de 30 minutos em horário comercial comercial.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/10 max-w-4xl mx-auto text-left">
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-[0.2em] mb-1">Endereço de Atendimento</p>
              <p className="text-xs text-emerald-100">{CLINIC_ADDRESS}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-[0.2em] mb-1">Horário de Atividades</p>
              <p className="text-xs text-emerald-100">Inseminação: Com Hora Marcada | Emergência: 24 horas</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-[0.2em] mb-1">Telefone Principal</p>
              <p className="text-xs text-emerald-100">WhatsApp Oficial: (65) 99695-9592</p>
            </div>
          </div>

        </div>
      </section>

      {/* 11. Footer (Elemento semântico sem H2, conforme solicitação) */}
      <footer className="bg-[#0b1a0f] text-gray-400 py-12 border-t border-emerald-950/40 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center sm:items-start md:items-center gap-8 border-b border-white/5 pb-8">
            
            {/* Esquerdo: Identificação Reduzida */}
            <div className="flex items-center gap-3.5">
              <img 
                src={inseminahorseGreenLogoUrl} 
                alt="InseminaHorse Logo Grande" 
                className="w-14 h-14 object-cover bg-white rounded-xl shadow-sm" 
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-base font-extrabold text-white block">InseminaHorse</span>
                <span className="text-[10px] text-[#808080] uppercase font-bold tracking-wider block -mt-0.5">Reprodução de Equinos em Cuiabá, MT</span>
              </div>
            </div>

            {/* Centro: Links de Navegação Rápidos (Navegação interna de âncoras) */}
            <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-gray-400">
              <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
              <a href="#servicos" className="hover:text-white transition-colors">Serviços</a>
              <a href="#calculador" className="hover:text-white transition-colors">Simulador</a>
              <a href="#beneficios" className="hover:text-white transition-colors">Benefícios</a>
              <a href="#faq" className="hover:text-white transition-colors">Dúvidas</a>
              <a href="#contato" className="hover:text-white transition-colors">Contato</a>
            </div>

            {/* Direito: Redes Sociais */}
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                title="Siga no Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                title="Siga no Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center sm:items-start md:items-center gap-4 text-[11px] text-gray-500">
            <div className="space-y-1">
              <p>InseminaHorse | Telefone/WhatsApp: 65 99695-9592 | Endereço: Av. João Eugênio Gonçalves Pinheiro, 410, Areão - Cuiabá (MT)</p>
              <p>Horário de Atendimento: Inseminação com Hora Marcada | Atendimento de Emergência: 24 horas</p>
            </div>
            <div className="space-y-1 md:text-right">
            <p>© 2026 InseminaHorse MT. Todos os direitos reservados.</p>
<p>
  <a
    href="https://wa.me/5565996959592"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline font-medium"
  >
    Desenvolvido por ML Marketing Digital | (65) 99695-9592
  </a>
</p>
<p className="italic opacity-80">
  Projeto demonstrativo desenvolvido pela ML Marketing Digital para fins de portfólio.
</p>
              </div>
              
            
          </div>

        </div>
      </footer>

    </div>
  );
}
