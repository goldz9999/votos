import { useState } from 'react';
import { Vote, Shield, Users, BarChart3, CheckCircle, Lock, Menu, X } from 'lucide-react';

export default function ElectoralLanding() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showVoteModal, setShowVoteModal] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        telefono: ''
    });

    const features = [
        {
            icon: Shield,
            title: "Seguridad Garantizada",
            description: "Encriptación de extremo a extremo y verificación múltiple para proteger cada voto"
        },
        {
            icon: Vote,
            title: "Votación Intuitiva",
            description: "Interface simple y accesible para que todos puedan ejercer su derecho al voto"
        },
        {
            icon: BarChart3,
            title: "Resultados en Tiempo Real",
            description: "Monitoreo transparente y actualización instantánea de los resultados electorales"
        },
        {
            icon: Users,
            title: "Gestión de Participantes",
            description: "Administración completa de votantes, candidatos y organizadores"
        },
        {
            icon: Lock,
            title: "Auditoría Completa",
            description: "Trazabilidad total con registros inmutables de cada transacción electoral"
        },
        {
            icon: CheckCircle,
            title: "Validación Automática",
            description: "Verificación instantánea de elegibilidad y prevención de fraudes"
        }
    ];

    const stats = [
        { number: "99.9%", label: "Uptime" },
        { number: "1M+", label: "Votos Procesados" },
        { number: "<2s", label: "Tiempo de Respuesta" },
        { number: "100%", label: "Transparencia" }
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

                        {/* Desktop Menu */}
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

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
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
                        <span className="text-blue-300 text-sm">🔒 Sistema Electoral de Nueva Generación</span>
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

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg shadow-blue-500/50">
                            Crear Elección
                        </button>
                        <button className="px-8 py-4 border-2 border-blue-400 hover:bg-blue-800 rounded-lg text-lg font-semibold transition">
                            Ver Demo
                        </button>
                    </div>

                    {/* Stats */}
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
                        ¿Listo para modernizar tus elecciones?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Únete a miles de organizaciones que confían en nosotros para sus procesos democráticos
                    </p>
                    <button className="px-10 py-5 bg-white text-blue-900 rounded-lg text-lg font-bold hover:bg-blue-50 transition transform hover:scale-105 shadow-xl">
                        Comenzar Ahora - Es Gratis
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 bg-blue-950 border-t border-blue-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Vote className="w-6 h-6 text-blue-400" />
                                <span className="text-lg font-bold">VoteSecure</span>
                            </div>
                            <p className="text-blue-300 text-sm">
                                Revolucionando la democracia digital con seguridad y transparencia.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Producto</h4>
                            <ul className="space-y-2 text-blue-300 text-sm">
                                <li><a href="#" className="hover:text-white">Características</a></li>
                                <li><a href="#" className="hover:text-white">Precios</a></li>
                                <li><a href="#" className="hover:text-white">Casos de uso</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Empresa</h4>
                            <ul className="space-y-2 text-blue-300 text-sm">
                                <li><a href="#" className="hover:text-white">Acerca de</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Carreras</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-blue-300 text-sm">
                                <li><a href="#" className="hover:text-white">Privacidad</a></li>
                                <li><a href="#" className="hover:text-white">Términos</a></li>
                                <li><a href="#" className="hover:text-white">Seguridad</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-blue-900 pt-8 text-center text-blue-400 text-sm">
                        © 2024 VoteSecure. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </div>
    );
}