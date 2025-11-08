import { useState } from 'react';
import { Vote, Shield, Users, BarChart3, CheckCircle, Lock, Menu, X } from 'lucide-react';

export default function ElectoralLanding() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showVoteModal, setShowVoteModal] = useState(false);
    const [showBallotModal, setShowBallotModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'presidencial' | 'regional' | 'distrital'>('presidencial');
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        telefono: ''
    });
    const [votes, setVotes] = useState({
        presidencial: '',
        regional: '',
        distrital: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos del votante verificados:', formData);
        setShowVoteModal(false);
        setShowBallotModal(true);
        setVotes({ presidencial: '', regional: '', distrital: '' }); // Reiniciar voto
        setActiveTab('presidencial');
    };

    const CandidateSection = ({ title, candidates, selected, onSelect, disabled }: {
        title: string;
        candidates: Array<{ id: string; name: string; party: string; photo: string }>;
        selected: string;
        onSelect: (id: string) => void;
        disabled?: boolean;
    }) => (
        <div className={`${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <h3 className="text-2xl font-bold text-blue-300 mb-6 text-center">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {candidates.map((candidato) => (
                    <label
                        key={candidato.id}
                        className={`relative block cursor-pointer rounded-2xl overflow-hidden border-4 transition-all duration-300 transform hover:scale-105 ${selected === candidato.id
                            ? 'border-green-400 shadow-2xl shadow-green-500/30 ring-4 ring-green-400/50'
                            : 'border-blue-700 hover:border-blue-500'
                            } ${disabled ? 'cursor-not-allowed' : ''}`}
                        onClick={(e) => {
                            if (disabled) return;
                            // Esto permite deseleccionar al hacer click en el mismo
                            if (selected === candidato.id) {
                                onSelect(''); // Deselecciona
                            } else {
                                onSelect(candidato.id);
                            }
                            e.preventDefault();
                        }}
                    >
                        {/* Input oculto solo para accesibilidad */}
                        <input
                            type="checkbox"
                            checked={selected === candidato.id}
                            onChange={() => { }}
                            className="sr-only"
                        />
                        <div className="bg-gradient-to-b from-blue-900 to-blue-950 p-6 text-center">
                            <img src={candidato.photo} alt={candidato.name} className="w-full h-64 object-cover rounded-xl mb-4 border-2 border-blue-600" />
                            <h4 className="text-xl font-bold text-white">{candidato.name}</h4>
                            <p className="text-blue-300 text-sm mt-1">{candidato.party}</p>
                        </div>
                        {selected === candidato.id && (
                            <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center pointer-events-none">
                                <CheckCircle className="w-20 h-20 text-green-400" />
                            </div>
                        )}
                    </label>
                ))}

                {/* Voto en Blanco - TAMBIÉN deseleccionable */}
                <label
                    className={`relative block cursor-pointer rounded-2xl overflow-hidden border-4 transition-all duration-300 transform hover:scale-105 ${selected === 'blanco'
                        ? 'border-green-400 shadow-2xl shadow-green-500/30 ring-4 ring-green-400/50'
                        : 'border-blue-700 hover:border-blue-500'
                        } ${disabled ? 'cursor-not-allowed' : ''}`}
                    onClick={(e) => {
                        if (disabled) return;
                        if (selected === 'blanco') {
                            onSelect('');
                        } else {
                            onSelect('blanco');
                        }
                        e.preventDefault();
                    }}
                >
                    <input
                        type="checkbox"
                        checked={selected === 'blanco'}
                        onChange={() => { }}
                        className="sr-only"
                    />
                    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 flex items-center justify-center h-full min-h-80">
                        <div className="text-center">
                            <div className="w-28 h-28 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-600">
                                <X className="w-14 h-14 text-gray-500" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-400">Voto en Blanco</h4>
                            <p className="text-gray-500 text-sm mt-2">No elijo a ningún candidato</p>
                        </div>
                    </div>
                </label>
            </div>.
        </div>
    );

    const features = [
        { icon: Shield, title: "Seguridad Garantizada", description: "Encriptación de extremo a extremo y verificación múltiple para proteger cada voto" },
        { icon: Vote, title: "Votación Intuitiva", description: "Interface simple y accesible para que todos puedan ejercer su derecho al voto" },
        { icon: BarChart3, title: "Resultados en Tiempo Real", description: "Monitoreo transparente y actualización instantánea de los resultados electorales" },
        { icon: Users, title: "Gestión de Participantes", description: "Administración completa de votantes, candidatos y organizadores" },
        { icon: Lock, title: "Auditoría Completa", description: "Trazabilidad total con registros inmutables de cada transacción electoral" },
        { icon: CheckCircle, title: "Validación Automática", description: "Verificación instantánea de elegibilidad y prevención de fraudes" }
    ];

    const stats = [
        { number: "99.9%", label: "Uptime" },
        { number: "1M+", label: "Votos Procesados" },
        { number: "<2s", label: "Tiempo de Respuesta" },
        { number: "100%", label: "Transparencia" }
    ];

    const presidentialCandidates = [
        { id: 'p1', name: 'María González', party: 'Partido Azul', photo: 'https://i.pravatar.cc/300?img=1' },
        { id: 'p2', name: 'Carlos Mendoza', party: 'Alianza Progreso', photo: 'https://i.pravatar.cc/300?img=2' },
        { id: 'p3', name: 'Ana Torres', party: 'Frente Nacional', photo: 'https://i.pravatar.cc/300?img=3' },
    ];

    const regionalCandidates = [
        { id: 'r1', name: 'Luis Ramírez', party: 'Región Unida', photo: 'https://i.pravatar.cc/300?img=5' },
        { id: 'r2', name: 'Sofía Herrera', party: 'Pro Región', photo: 'https://i.pravatar.cc/300?img=6' },
    ];

    const distritalCandidates = [
        { id: 'd1', name: 'Pedro Castro', party: 'Distrito Activo', photo: 'https://i.pravatar.cc/300?img=8' },
        { id: 'd2', name: 'Laura Vega', party: 'Vecinos Primero', photo: 'https://i.pravatar.cc/300?img=9' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-blue-950/80 backdrop-blur-md z-50 border-b border-blue-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Vote className="w-8 h-8 text-blue-400" />
                            <span className="text-xl font-bold">VoteSecure</span>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            <a href="#inicio" className="hover:text-blue-300 transition">Inicio</a>
                            <a href="#caracteristicas" className="hover:text-blue-300 transition">Características</a>
                            <a href="#seguridad" className="hover:text-blue-300 transition">Seguridad</a>
                            <a href="#contacto" className="hover:text-blue-300 transition">Contacto</a>
                        </div>

                        <div className="hidden md:flex space-x-4">
                            <button className="px-4 py-2 rounded-lg border border-blue-400 hover:bg-blue-800 transition">
                                Iniciar Sesión
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition">
                                Comenzar
                            </button>
                        </div>

                        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 space-y-4">
                            <a href="#inicio" className="block hover:text-blue-300 transition">Inicio</a>
                            <a href="#caracteristicas" className="block hover:text-blue-300 transition">Características</a>
                            <a href="#seguridad" className="block hover:text-blue-300 transition">Seguridad</a>
                            <a href="#contacto" className="block hover:text-blue-300 transition">Contacto</a>
                            <div className="flex flex-col space-y-2 pt-4">
                                <button className="px-4 py-2 rounded-lg border border-blue-400 hover:bg-blue-800 transition">
                                    Iniciar Sesión
                                </button>
                                <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition">
                                    Comenzar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section id="inicio" className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-2 bg-blue-800/50 rounded-full border border-blue-600">
                        <span className="text-blue-300 text-sm">Sistema Electoral de Nueva Generación</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                        Democracia Digital
                        <br />
                        Segura y Transparente
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
                        La plataforma más avanzada para gestionar elecciones con total seguridad,
                        transparencia y confiabilidad. Tu voto cuenta, tu voto es seguro.
                    </p>

                    <button
                        onClick={() => setShowVoteModal(true)}
                        className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg shadow-blue-500/50"
                    >
                        Votar Ahora
                    </button>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-blue-900/50 backdrop-blur p-6 rounded-xl border border-blue-700/50">
                                <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">{stat.number}</div>
                                <div className="text-blue-200 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="caracteristicas" className="py-20 px-4 bg-blue-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Características Principales</h2>
                        <p className="text-xl text-blue-200">Todo lo que necesitas para una elección exitosa</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-blue-950/50 backdrop-blur p-8 rounded-2xl border border-blue-800/50 hover:border-blue-600 transition transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
                            >
                                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-blue-200">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section id="seguridad" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Seguridad de Nivel
                                <span className="text-blue-400"> Empresarial</span>
                            </h2>
                            <p className="text-xl text-blue-200 mb-8">
                                Implementamos los más altos estándares de seguridad para garantizar
                                la integridad de cada voto y proteger la privacidad de los votantes.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Encriptación AES-256",
                                    "Autenticación multifactor",
                                    "Blockchain para inmutabilidad",
                                    "Auditorías de seguridad periódicas",
                                    "Cumplimiento con normativas internacionales"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                                        <span className="text-lg">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-800 to-indigo-900 rounded-2xl p-12 border border-blue-700 shadow-2xl">
                                <Shield className="w-full h-64 text-blue-400 opacity-20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <Lock className="w-24 h-24 text-blue-300 mx-auto mb-4" />
                                        <p className="text-2xl font-bold">Protección Total</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-blue-800 to-indigo-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        ¿Listo para ejercer tu derecho al voto?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Participa en el proceso democrático de forma segura y confiable
                    </p>
                    <button
                        onClick={() => setShowVoteModal(true)}
                        className="px-10 py-5 bg-white text-blue-900 rounded-lg text-lg font-bold hover:bg-blue-50 transition transform hover:scale-105 shadow-xl"
                    >
                        Votar Ahora
                    </button>
                </div>
            </section>

            {/* Modal de Registro */}
            {showVoteModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-blue-950 rounded-2xl border border-blue-800 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-blue-800 flex justify-between items-center sticky top-0 bg-blue-950">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Vote className="w-6 h-6 text-blue-400" />
                                Registro de Votante
                            </h3>
                            <button onClick={() => setShowVoteModal(false)} className="text-blue-300 hover:text-white transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Campos del formulario (sin cambios) */}
                            <div><label className="block text-sm font-medium text-blue-200 mb-2">Nombre *</label><input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required className="w-full px-4 py-3 bg-blue-900/50 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-400" placeholder="Ingresa tu nombre" /></div>
                            <div><label className="block text-sm font-medium text-blue-200 mb-2">Apellido *</label><input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} required className="w-full px-4 py-3 bg-blue-900/50 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-400" placeholder="Ingresa tu apellido" /></div>
                            <div><label className="block text-sm font-medium text-blue-200 mb-2">DNI *</label><input type="text" name="dni" value={formData.dni} onChange={handleInputChange} required className="w-full px-4 py-3 bg-blue-900/50 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-400" placeholder="Ingresa tu DNI" /></div>
                            <div><label className="block text-sm font-medium text-blue-200 mb-2">Email *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-blue-900/50 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-400" placeholder="tu@email.com" /></div>
                            <div><label className="block text-sm font-medium text-blue-200 mb-2">Teléfono</label><input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full px-4 py-3 bg-blue-900/50 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-400" placeholder="+51 999 999 999" /></div>

                            <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 flex items-start gap-3">
                                <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-200">
                                    Tus datos están protegidos y encriptados. Solo se utilizarán para verificar tu identidad.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowVoteModal(false)} className="flex-1 px-6 py-3 border border-blue-600 rounded-lg hover:bg-blue-900 transition">Cancelar</button>
                                <button type="submit" className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition">Continuar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL DE BOLETA ELECTORAL - FINAL: Deseleccionar + Desbloquear pestañas */}
            {showBallotModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-blue-950 rounded-3xl border border-blue-700 max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-800 to-indigo-900 p-6 border-b border-blue-600 flex-shrink-0">
                            <div className="flex justify-between items-start">
                                <div className="max-w-2xl">
                                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                        <Vote className="w-8 h-8 md:w-10 md:h-10 text-blue-300" />
                                        Boleta Electoral Oficial
                                    </h2>
                                    <p className="text-blue-200 mt-1 text-sm md:text-base">
                                        {formData.nombre} {formData.apellido} • DNI: {formData.dni}
                                    </p>
                                    <p className="text-yellow-300 font-bold text-xs md:text-sm mt-2">
                                        SOLO PUEDES VOTAR POR UNA CATEGORÍA (puedes cambiar tu voto)
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowBallotModal(false);
                                        setVotes({ presidencial: '', regional: '', distrital: '' });
                                        setActiveTab('presidencial');
                                    }}
                                    className="text-blue-300 hover:text-white transition mt-1"
                                >
                                    <X className="w-7 h-7 md:w-8 md:h-8" />
                                </button>
                            </div>
                        </div>

                        {/* Tabs - Se desbloquean si no hay voto */}
                        <div className="flex border-b border-blue-800 bg-blue-900/50 flex-shrink-0">
                            {(['presidencial', 'regional', 'distrital'] as const).map((tab) => {
                                const hasVote = Object.values(votes).some(Boolean);
                                const isLocked = hasVote && !votes[tab];

                                return (
                                    <button
                                        key={tab}
                                        onClick={() => !isLocked && setActiveTab(tab)}
                                        disabled={isLocked}
                                        className={`flex-1 py-3 px-4 text-sm md:py-4 md:px-6 md:text-base font-semibold transition relative ${activeTab === tab
                                            ? 'text-blue-300 bg-blue-800/50 border-b-4 border-blue-400'
                                            : isLocked
                                                ? 'text-gray-500 cursor-not-allowed opacity-60'
                                                : 'text-blue-400 hover:text-blue-200'
                                            }`}
                                    >
                                        <span className="block">
                                            {tab === 'presidencial' && 'Presidente'}
                                            {tab === 'regional' && 'Gobernador Regional'}
                                            {tab === 'distrital' && 'Alcalde Distrital'}
                                        </span>
                                        {votes[tab] && <CheckCircle className="w-4 h-4 inline-block ml-1 text-green-400" />}
                                        {isLocked && <Lock className="w-3 h-3 inline-block ml-1" />}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Mensaje de voto */}
                        {Object.values(votes).some(Boolean) && (
                            <div className="bg-green-900/40 border-y border-green-700 p-3 text-center flex-shrink-0">
                                <p className="text-green-300 font-bold text-sm md:text-base">
                                    Votaste por: <span className="underline">
                                        {votes.presidencial && 'Presidente'}
                                        {votes.regional && 'Gobernador Regional'}
                                        {votes.distrital && 'Alcalde Distrital'}
                                    </span>
                                    <span className="block text-green-400 text-xs mt-1">
                                        Haz click de nuevo en tu candidato para cambiar o anular
                                    </span>
                                </p>
                            </div>
                        )}

                        {/* Contenido */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            {activeTab === 'presidencial' && (
                                <CandidateSection
                                    title="Presidente y Vicepresidente"
                                    candidates={presidentialCandidates}
                                    selected={votes.presidencial}
                                    onSelect={(id) => {
                                        if (id === '') {
                                            setVotes({ presidencial: '', regional: '', distrital: '' });
                                        } else {
                                            setVotes({ presidencial: id, regional: '', distrital: '' });
                                        }
                                    }}
                                    disabled={!!(votes.regional || votes.distrital)}
                                />
                            )}
                            {activeTab === 'regional' && (
                                <CandidateSection
                                    title="Gobernador Regional"
                                    candidates={regionalCandidates}
                                    selected={votes.regional}
                                    onSelect={(id) => {
                                        if (id === '') {
                                            setVotes({ presidencial: '', regional: '', distrital: '' });
                                        } else {
                                            setVotes({ presidencial: '', regional: id, distrital: '' });
                                        }
                                    }}
                                    disabled={!!(votes.presidencial || votes.distrital)}
                                />
                            )}
                            {activeTab === 'distrital' && (
                                <CandidateSection
                                    title="Alcalde Distrital"
                                    candidates={distritalCandidates}
                                    selected={votes.distrital}
                                    onSelect={(id) => {
                                        if (id === '') {
                                            setVotes({ presidencial: '', regional: '', distrital: '' });
                                        } else {
                                            setVotes({ presidencial: '', regional: '', distrital: id });
                                        }
                                    }}
                                    disabled={!!(votes.presidencial || votes.regional)}
                                />
                            )}
                        </div>

                        {/* FOOTER FIJO - Siempre visible */}
                        <div className="p-5 md:p-6 bg-blue-900/90 border-t-2 border-blue-700 flex-shrink-0">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 shadow-xl ${Object.values(votes).some(Boolean)
                                    ? 'bg-green-500 text-white animate-pulse'
                                    : 'bg-blue-700 text-blue-300'
                                    }`}>
                                    {Object.values(votes).some(Boolean) ? <CheckCircle className="w-10 h-10 md:w-12 md:h-12" /> : '?'}
                                </div>
                                <div className="text-center">
                                    <p className="text-xl md:text-2xl font-bold text-blue-200">
                                        Voto: <span className="text-green-400">{Object.values(votes).some(Boolean) ? '1/1' : '0/1'}</span>
                                    </p>
                                    <p className="text-blue-300 text-xs md:text-sm">
                                        {Object.values(votes).some(Boolean) ? 'Listo para enviar' : 'Elige un candidato'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowBallotModal(false);
                                        setVotes({ presidencial: '', regional: '', distrital: '' });
                                        setActiveTab('presidencial');
                                    }}
                                    className="flex-1 px-5 py-3 border border-blue-500 rounded-xl hover:bg-blue-800 transition font-medium text-sm md:text-base"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        const selected = Object.values(votes).find(Boolean);
                                        if (!selected) return alert("Debes seleccionar un candidato.");

                                        const categoria = votes.presidencial ? 'Presidente' :
                                            votes.regional ? 'Gobernador Regional' : 'Alcalde Distrital';
                                        const candidato = selected === 'blanco' ? 'Voto en Blanco' :
                                            [...presidentialCandidates, ...regionalCandidates, ...distritalCandidates]
                                                .find(c => c.id === selected)?.name || selected;

                                        alert(`¡VOTO ENVIADO CON ÉXITO!\n\nCategoría: ${categoria}\nCandidato: ${candidato}\n\nGracias por participar en la democracia digital.`);

                                        setShowBallotModal(false);
                                        setVotes({ presidencial: '', regional: '', distrital: '' });
                                        setActiveTab('presidencial');
                                    }}
                                    disabled={!Object.values(votes).some(Boolean)}
                                    className={`flex-1 px-6 py-3 rounded-xl font-bold text-white text-sm md:text-lg transition shadow-lg transform hover:scale-105 ${Object.values(votes).some(Boolean)
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                                        : 'bg-gray-600 opacity-60 cursor-not-allowed'
                                        }`}
                                >
                                    Confirmar y Enviar Voto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="py-12 px-4 bg-blue-950 border-t border-blue-900">
                <div className="max-w-7xl mx-auto text-center text-blue-400 text-sm">
                    © 2024 VoteSecure. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
}