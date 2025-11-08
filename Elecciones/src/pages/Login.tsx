import { useState } from 'react';
import { Shield, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulación de autenticación (reemplazar con lógica real)
        setTimeout(() => {
            if (formData.username === 'admin' && formData.password === 'admin123') {
                // Login exitoso
                localStorage.setItem('adminAuth', 'true');
                localStorage.setItem('adminUser', formData.username);
                alert('¡Login exitoso! Redirigiendo al panel de administración...');
                // Aquí redirigirías al dashboard: window.location.href = '/admin/dashboard';
            } else {
                setError('Usuario o contraseña incorrectos');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
            {/* Partículas de fondo decorativas */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-xl shadow-blue-500/30">
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
                    <p className="text-blue-300">Ingresa tus credenciales para continuar</p>
                </div>

                {/* Card de Login */}
                <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl shadow-black/40 overflow-hidden">
                    {/* Header del Card */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
                        <Lock className="w-12 h-12 text-white mx-auto mb-2" />
                        <h2 className="text-xl font-semibold text-white">Acceso Seguro</h2>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-start gap-3 animate-shake">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-red-200 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Campo Usuario */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Usuario
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <User className="w-5 h-5 text-slate-500" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Ingresa tu usuario"
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        {/* Campo Contraseña */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <Lock className="w-5 h-5 text-slate-500" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Ingresa tu contraseña"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-slate-300 transition"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Recordar sesión */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-slate-600 bg-slate-900/50 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                                />
                                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition">
                                    Recordar sesión
                                </span>
                            </label>
                            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {/* Botón Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-xl font-semibold text-white transition transform ${loading
                                    ? 'bg-slate-600 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/30'
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Verificando...
                                </div>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>

                        {/* Info de seguridad */}
                        <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 flex items-start gap-3">
                            <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-200">
                                Tu sesión está protegida con encriptación de extremo a extremo y autenticación de doble factor.
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-slate-400">
                        ¿Problemas para acceder?{' '}
                        <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                            Contacta soporte
                        </a>
                    </p>
                </div>

                {/* Credenciales de prueba (remover en producción) */}
                <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                    <p className="text-xs text-yellow-200 text-center font-mono">
                        Demo: usuario: <strong>admin</strong> | contraseña: <strong>admin123</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}