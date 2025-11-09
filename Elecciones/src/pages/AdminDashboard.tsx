import { useState } from 'react';
import {
    LayoutDashboard, Upload, Trash2, Brain, BarChart3,
    Users, Vote, TrendingUp, AlertCircle, CheckCircle,
    Download, RefreshCw, Settings, LogOut, FileSpreadsheet,
    Filter, Search, X, Eye, Database, Activity, Zap
} from 'lucide-react';

export default function AdminDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [uploadedData, setUploadedData] = useState({
        votantes: [],
        candidatos: []
    });
    const [trainingStatus, setTrainingStatus] = useState('idle'); // idle, training, completed
    const [trainingProgress, setTrainingProgress] = useState(0);

    // Mock data para el dashboard
    const stats = [
        { icon: Users, label: 'Votantes Registrados', value: '12,543', change: '+12.5%', color: 'blue' },
        { icon: Vote, label: 'Votos Emitidos', value: '8,234', change: '+8.3%', color: 'green' },
        { icon: TrendingUp, label: 'Participación', value: '65.7%', change: '+3.2%', color: 'purple' },
        { icon: AlertCircle, label: 'Anomalías Detectadas', value: '23', change: '-15%', color: 'red' }
    ];

    // Componente: Dashboard Principal
    const Dashboard = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Panel de Control</h2>
                <p className="text-slate-400">Vista general del sistema electoral</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                            </div>
                            <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-slate-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        Actividad de Votación (24h)
                    </h3>
                    <div className="h-64 flex items-end justify-around gap-2">
                        {[65, 85, 45, 92, 78, 88, 95, 72, 68, 80, 90, 75].map((h, i) => (
                            <div key={i} className="flex-1 bg-blue-500/20 rounded-t-lg relative group cursor-pointer hover:bg-blue-500/40 transition" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition">
                                    {Math.floor(h * 10)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>00:00</span>
                        <span>12:00</span>
                        <span>23:59</span>
                    </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-green-400" />
                        Distribución por Candidato
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: 'María González', votes: 3245, percent: 39, color: 'blue' },
                            { name: 'Carlos Mendoza', votes: 2876, percent: 35, color: 'green' },
                            { name: 'Ana Torres', votes: 2113, percent: 26, color: 'purple' }
                        ].map((c, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-300">{c.name}</span>
                                    <span className="text-slate-400">{c.votes} votos ({c.percent}%)</span>
                                </div>
                                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                                    <div className={`h-full bg-${c.color}-500 rounded-full transition-all duration-1000`} style={{ width: `${c.percent}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Alertas */}
            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                    <div>
                        <h4 className="text-lg font-bold text-white mb-2">Anomalías Recientes Detectadas</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li>• 12 intentos de votación duplicada en los últimos 30 minutos</li>
                            <li>• 5 DNIs sin validación pendientes de verificación manual</li>
                            <li>• 6 sesiones sospechosas con geolocalización inconsistente</li>
                        </ul>
                        <button className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition">
                            Ver Detalle Completo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Componente: Carga de Datos
    const DataUpload = () => {
        const [dragActive, setDragActive] = useState(false);

        const handleFileUpload = (type: 'votantes' | 'candidatos') => {
            // Simulación de carga de archivo
            const mockData = Array.from({ length: 100 }, (_, i) => ({
                id: i + 1,
                nombre: `Persona ${i + 1}`,
                dni: `${10000000 + i}`,
                email: `persona${i + 1}@email.com`,
                estado: Math.random() > 0.1 ? 'válido' : 'duplicado'
            }));

            setUploadedData(prev => ({ ...prev, [type]: mockData }));
        };

        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Carga de Datos</h2>
                    <p className="text-slate-400">Importa archivos CSV o Excel con información electoral</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Upload Votantes */}
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-6 h-6 text-blue-400" />
                            <h3 className="text-xl font-bold text-white">Padrón Electoral</h3>
                        </div>

                        <div
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 hover:border-slate-500'
                                }`}
                            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFileUpload('votantes'); }}
                        >
                            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-300 mb-2">Arrastra un archivo o haz click para seleccionar</p>
                            <p className="text-slate-500 text-sm mb-4">CSV, XLSX (Max 50MB)</p>
                            <button
                                onClick={() => handleFileUpload('votantes')}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
                            >
                                Seleccionar Archivo
                            </button>
                        </div>

                        {uploadedData.votantes.length > 0 && (
                            <div className="mt-4 p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-400 inline mr-2" />
                                <span className="text-green-300">{uploadedData.votantes.length} registros cargados</span>
                            </div>
                        )}
                    </div>

                    {/* Upload Candidatos */}
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                        <div className="flex items-center gap-3 mb-4">
                            <Vote className="w-6 h-6 text-purple-400" />
                            <h3 className="text-xl font-bold text-white">Candidatos</h3>
                        </div>

                        <div
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition ${dragActive ? 'border-purple-500 bg-purple-500/10' : 'border-slate-600 hover:border-slate-500'
                                }`}
                        >
                            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-300 mb-2">Arrastra un archivo o haz click para seleccionar</p>
                            <p className="text-slate-500 text-sm mb-4">CSV, XLSX (Max 10MB)</p>
                            <button
                                onClick={() => handleFileUpload('candidatos')}
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
                            >
                                Seleccionar Archivo
                            </button>
                        </div>

                        {uploadedData.candidatos.length > 0 && (
                            <div className="mt-4 p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-400 inline mr-2" />
                                <span className="text-green-300">{uploadedData.candidatos.length} registros cargados</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Formato de ejemplo */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-yellow-400" />
                        Formato Requerido
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-slate-400 text-sm mb-2 font-semibold">Padrón Electoral (votantes.csv)</p>
                            <pre className="bg-slate-900 rounded p-3 text-xs text-green-400 overflow-x-auto">
                                {`dni,nombre,apellido,email,telefono
12345678,Juan,Pérez,juan@email.com,999888777
87654321,María,García,maria@email.com,888777666`}
                            </pre>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm mb-2 font-semibold">Candidatos (candidatos.csv)</p>
                            <pre className="bg-slate-900 rounded p-3 text-xs text-green-400 overflow-x-auto">
                                {`id,nombre,partido,categoria,foto_url
1,María González,Azul,presidencial,url
2,Carlos Mendoza,Progreso,presidencial,url`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Componente: Limpieza de Datos
    const DataCleaning = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [filterStatus, setFilterStatus] = useState('todos');

        const sampleData = uploadedData.votantes.length > 0 ? uploadedData.votantes :
            Array.from({ length: 20 }, (_, i) => ({
                id: i + 1,
                nombre: `Persona ${i + 1}`,
                dni: `${10000000 + i}`,
                email: `persona${i + 1}@email.com`,
                estado: Math.random() > 0.7 ? 'duplicado' : Math.random() > 0.8 ? 'inválido' : 'válido'
            }));

        const filteredData = sampleData.filter(item => {
            const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.dni.includes(searchTerm);
            const matchesFilter = filterStatus === 'todos' || item.estado === filterStatus;
            return matchesSearch && matchesFilter;
        });

        const stats = {
            total: sampleData.length,
            validos: sampleData.filter(d => d.estado === 'válido').length,
            duplicados: sampleData.filter(d => d.estado === 'duplicado').length,
            invalidos: sampleData.filter(d => d.estado === 'inválido').length
        };

        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Limpieza de Datos</h2>
                    <p className="text-slate-400">Detecta y corrige registros duplicados o inválidos</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                        <Database className="w-5 h-5 text-blue-400 mb-2" />
                        <p className="text-2xl font-bold text-white">{stats.total}</p>
                        <p className="text-slate-400 text-sm">Total Registros</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-green-700/50">
                        <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
                        <p className="text-2xl font-bold text-white">{stats.validos}</p>
                        <p className="text-slate-400 text-sm">Válidos</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-yellow-700/50">
                        <AlertCircle className="w-5 h-5 text-yellow-400 mb-2" />
                        <p className="text-2xl font-bold text-white">{stats.duplicados}</p>
                        <p className="text-slate-400 text-sm">Duplicados</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-red-700/50">
                        <X className="w-5 h-5 text-red-400 mb-2" />
                        <p className="text-2xl font-bold text-white">{stats.invalidos}</p>
                        <p className="text-slate-400 text-sm">Inválidos</p>
                    </div>
                </div>

                {/* Controles */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre o DNI..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['todos', 'válido', 'duplicado', 'inválido'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-3 rounded-lg font-semibold transition ${filterStatus === status
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabla de datos */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-900 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Nombre</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">DNI</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Estado</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {filteredData.slice(0, 10).map((row) => (
                                    <tr key={row.id} className="hover:bg-slate-700/50 transition">
                                        <td className="px-6 py-4 text-sm text-slate-300">{row.id}</td>
                                        <td className="px-6 py-4 text-sm text-white">{row.nombre}</td>
                                        <td className="px-6 py-4 text-sm text-slate-300">{row.dni}</td>
                                        <td className="px-6 py-4 text-sm text-slate-400">{row.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.estado === 'válido' ? 'bg-green-900/30 text-green-400 border border-green-700' :
                                                row.estado === 'duplicado' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700' :
                                                    'bg-red-900/30 text-red-400 border border-red-700'
                                                }`}>
                                                {row.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 hover:bg-slate-600 rounded transition" title="Ver detalles">
                                                    <Eye className="w-4 h-4 text-blue-400" />
                                                </button>
                                                <button className="p-2 hover:bg-slate-600 rounded transition" title="Eliminar">
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-900 px-6 py-4 flex justify-between items-center border-t border-slate-700">
                        <p className="text-sm text-slate-400">Mostrando 10 de {filteredData.length} registros</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition">Anterior</button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition">Siguiente</button>
                        </div>
                    </div>
                </div>

                {/* Acciones masivas */}
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition flex items-center gap-2">
                        <Trash2 className="w-5 h-5" />
                        Eliminar Duplicados ({stats.duplicados})
                    </button>
                    <button className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold transition flex items-center gap-2">
                        <RefreshCw className="w-5 h-5" />
                        Revalidar Inválidos ({stats.invalidos})
                    </button>
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Exportar Datos Limpios
                    </button>
                </div>
            </div>
        );
    };

    // Componente: Entrenamiento ML
    const Training = () => {
        const handleStartTraining = () => {
            setTrainingStatus('training');
            setTrainingProgress(0);

            const interval = setInterval(() => {
                setTrainingProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTrainingStatus('completed');
                        return 100;
                    }
                    return prev + 5;
                });
            }, 200);
        };

        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Entrenamiento de Modelos</h2>
                    <p className="text-slate-400">Configura y entrena modelos de Machine Learning para análisis predictivo</p>
                </div>

                {/* Configuración */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-blue-400" />
                            Configuración del Modelo
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Tipo de Modelo</label>
                                <select className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Random Forest</option>
                                    <option>Gradient Boosting</option>
                                    <option>Neural Network</option>
                                    <option>SVM</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Dataset de Entrenamiento</label>
                                <select className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Datos Históricos 2020-2024</option>
                                    <option>Datos Simulados</option>
                                    <option>Dataset Personalizado</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Épocas de Entrenamiento</label>
                                <input type="number" defaultValue="100" className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Learning Rate</label>
                                <input type="number" step="0.001" defaultValue="0.001" className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-purple-400" />
                            Características del Modelo
                        </h3>
                        <div className="space-y-3">
                            {[
                                'Predicción de Participación Electoral',
                                'Detección de Anomalías en Votación',
                                'Análisis de Patrones de Comportamiento',
                                'Clustering de Votantes',
                                'Clasificación de Intención de Voto'
                            ].map((feature, i) => (
                                <label key={i} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg cursor-pointer hover:bg-slate-900 transition">
                                    <input type="checkbox" defaultChecked={i < 3} className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500" />
                                    <span className="text-slate-300">{feature}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Estado del entrenamiento */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        Estado del Entrenamiento
                    </h3>

                    {trainingStatus === 'idle' && (
                        <div className="text-center py-8">
                            <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400 mb-6">El modelo está listo para ser entrenado</p>
                            <button
                                onClick={handleStartTraining}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
                            >
                                Iniciar Entrenamiento
                            </button>
                        </div>
                    )}

                    {trainingStatus === 'training' && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-300">Progreso del entrenamiento</span>
                                <span className="text-blue-400 font-bold">{trainingProgress}%</span>
                            </div>
                            <div className="h-4 bg-slate-700 rounded-full overflow-hidden mb-4">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                                    style={{ width: `${trainingProgress}%` }}
                                ></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="bg-slate-900/50 p-3 rounded-lg">
                                    <p className="text-slate-400 mb-1">Época Actual</p>
                                    <p className="text-white font-bold">{Math.floor(trainingProgress)}/100</p>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-lg">
                                    <p className="text-slate-400 mb-1">Accuracy</p>
                                    <p className="text-green-400 font-bold">{(85 + trainingProgress / 10).toFixed(2)}%</p>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-lg">
                                    <p className="text-slate-400 mb-1">Loss</p>
                                    <p className="text-yellow-400 font-bold">{(0.5 - trainingProgress / 200).toFixed(4)}</p>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-lg">
                                    <p className="text-slate-400 mb-1">Tiempo Restante</p>
                                    <p className="text-blue-400 font-bold">{Math.floor((100 - trainingProgress) * 0.2)}s</p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-center">
                                <div className="animate-spin w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full"></div>
                            </div>
                        </div>
                    )}

                    {trainingStatus === 'completed' && (
                        <div className="text-center py-8">
                            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                            <h4 className="text-2xl font-bold text-white mb-2">¡Entrenamiento Completado!</h4>
                            <p className="text-slate-400 mb-6">El modelo ha sido entrenado exitosamente</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-2xl mx-auto">
                                <div className="bg-slate-900/50 p-4 rounded-lg border border-green-700/50">
                                    <p className="text-slate-400 text-sm mb-1">Accuracy Final</p>
                                    <p className="text-green-400 font-bold text-xl">95.2%</p>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-lg border border-blue-700/50">
                                    <p className="text-slate-400 text-sm mb-1">F1-Score</p>
                                    <p className="text-blue-400 font-bold text-xl">0.932</p>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-lg border border-purple-700/50">
                                    <p className="text-slate-400 text-sm mb-1">Precisión</p>
                                    <p className="text-purple-400 font-bold text-xl">94.8%</p>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-lg border border-yellow-700/50">
                                    <p className="text-slate-400 text-sm mb-1">Recall</p>
                                    <p className="text-yellow-400 font-bold text-xl">93.1%</p>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setTrainingStatus('idle')}
                                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
                                >
                                    Entrenar Nuevamente
                                </button>
                                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition flex items-center gap-2">
                                    <Download className="w-5 h-5" />
                                    Exportar Modelo
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Historial de entrenamientos */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">Historial de Entrenamientos</h3>
                    <div className="space-y-3">
                        {[
                            { date: '2024-11-08 14:30', model: 'Random Forest', accuracy: '95.2%', status: 'completado' },
                            { date: '2024-11-07 10:15', model: 'Neural Network', accuracy: '92.8%', status: 'completado' },
                            { date: '2024-11-06 16:45', model: 'Gradient Boosting', accuracy: '93.5%', status: 'completado' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition">
                                <div className="flex items-center gap-4">
                                    <Brain className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <p className="text-white font-semibold">{item.model}</p>
                                        <p className="text-slate-400 text-sm">{item.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-green-400 font-semibold">{item.accuracy}</span>
                                    <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs border border-green-700">
                                        {item.status}
                                    </span>
                                    <button className="p-2 hover:bg-slate-700 rounded transition">
                                        <Download className="w-4 h-4 text-slate-400" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Componente: Visualización
    const Visualization = () => {
        const [selectedChart, setSelectedChart] = useState('prediccion');

        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Visualización y Análisis</h2>
                    <p className="text-slate-400">Gráficos interactivos y reportes detallados</p>
                </div>

                {/* Selector de gráficos */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {[
                        { id: 'prediccion', label: 'Predicción Electoral', icon: TrendingUp },
                        { id: 'participacion', label: 'Participación', icon: Users },
                        { id: 'geografico', label: 'Análisis Geográfico', icon: BarChart3 },
                        { id: 'demografico', label: 'Demografía', icon: Activity },
                        { id: 'anomalias', label: 'Anomalías', icon: AlertCircle }
                    ].map(chart => (
                        <button
                            key={chart.id}
                            onClick={() => setSelectedChart(chart.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${selectedChart === chart.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                                }`}
                        >
                            <chart.icon className="w-5 h-5" />
                            {chart.label}
                        </button>
                    ))}
                </div>

                {/* Predicción Electoral */}
                {selectedChart === 'prediccion' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-400" />
                                Proyección de Resultados
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'María González', current: 39, predicted: 42, color: 'blue', trend: '+3%' },
                                    { name: 'Carlos Mendoza', current: 35, predicted: 36, color: 'green', trend: '+1%' },
                                    { name: 'Ana Torres', current: 26, predicted: 22, color: 'purple', trend: '-4%' }
                                ].map((c, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-300 font-medium">{c.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-slate-400 text-sm">Actual: {c.current}%</span>
                                                <span className={`text-${c.color}-400 font-bold`}>→ {c.predicted}%</span>
                                                <span className={`text-xs px-2 py-1 rounded ${c.trend.startsWith('+') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                                                    {c.trend}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                                                <div className={`h-full bg-${c.color}-500/50`} style={{ width: `${c.current}%` }}></div>
                                            </div>
                                            <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                                                <div className={`h-full bg-${c.color}-500`} style={{ width: `${c.predicted}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                                <p className="text-blue-200 text-sm">Proyección basada en modelo Random Forest con 95.2% de accuracy</p>
                            </div>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-xl font-bold text-white mb-4">Evolución Temporal</h3>
                            <div className="h-64 flex items-end justify-between gap-1">
                                {Array.from({ length: 30 }, (_, i) => {
                                    const blue = 35 + Math.sin(i * 0.3) * 8;
                                    const green = 30 + Math.cos(i * 0.4) * 6;
                                    const purple = 100 - blue - green;
                                    return (
                                        <div key={i} className="flex-1 flex flex-col justify-end gap-1">
                                            <div className="bg-blue-500/80 rounded-t" style={{ height: `${blue}%` }}></div>
                                            <div className="bg-green-500/80" style={{ height: `${green}%` }}></div>
                                            <div className="bg-purple-500/80 rounded-b" style={{ height: `${purple}%` }}></div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>Hace 30 días</span>
                                <span>Hace 15 días</span>
                                <span>Hoy</span>
                            </div>
                            <div className="flex gap-4 justify-center mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                    <span className="text-slate-400 text-sm">María G.</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                                    <span className="text-slate-400 text-sm">Carlos M.</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                                    <span className="text-slate-400 text-sm">Ana T.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Participación */}
                {selectedChart === 'participacion' && (
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-lg font-bold text-white mb-4">Por Edad</h3>
                            <div className="space-y-3">
                                {[
                                    { range: '18-25', value: 58 },
                                    { range: '26-35', value: 72 },
                                    { range: '36-50', value: 81 },
                                    { range: '51-65', value: 76 },
                                    { range: '65+', value: 69 }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-300">{item.range} años</span>
                                            <span className="text-blue-400 font-semibold">{item.value}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500" style={{ width: `${item.value}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-lg font-bold text-white mb-4">Por Género</h3>
                            <div className="flex items-center justify-center h-48">
                                <div className="relative w-48 h-48">
                                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="20" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="126 251" strokeLinecap="round" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="20" strokeDasharray="125 251" strokeDashoffset="-126" strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <p className="text-3xl font-bold text-white">65.7%</p>
                                        <p className="text-slate-400 text-sm">Total</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <div className="text-center">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                        <span className="text-slate-300 text-sm">Mujeres</span>
                                    </div>
                                    <p className="text-xl font-bold text-white">51%</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-3 bg-purple-500 rounded"></div>
                                        <span className="text-slate-300 text-sm">Hombres</span>
                                    </div>
                                    <p className="text-xl font-bold text-white">49%</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-lg font-bold text-white mb-4">Por Hora del Día</h3>
                            <div className="h-48 flex items-end justify-between gap-1">
                                {[20, 35, 55, 70, 85, 95, 88, 75, 60, 45, 30, 25].map((h, i) => (
                                    <div key={i} className="flex-1 bg-green-500/80 rounded-t hover:bg-green-500 transition cursor-pointer" style={{ height: `${h}%` }} title={`${8 + i}:00 - ${h}%`}></div>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>8am</span>
                                <span>2pm</span>
                                <span>7pm</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Análisis Geográfico */}
                {selectedChart === 'geografico' && (
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-purple-400" />
                            Mapa de Calor - Participación por Distrito
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {Array.from({ length: 24 }, (_, i) => {
                                const participation = 40 + Math.random() * 50;
                                const color = participation > 75 ? 'green' : participation > 60 ? 'yellow' : participation > 45 ? 'orange' : 'red';
                                return (
                                    <div key={i} className={`bg-${color}-900/30 border border-${color}-700/50 rounded-lg p-4 hover:scale-105 transition cursor-pointer`}>
                                        <p className="text-slate-400 text-xs mb-1">Distrito {i + 1}</p>
                                        <p className={`text-2xl font-bold text-${color}-400`}>{participation.toFixed(1)}%</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex gap-4 justify-center mt-6">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded"></div>
                                <span className="text-slate-400 text-sm">&gt; 75%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                                <span className="text-slate-400 text-sm">60-75%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                                <span className="text-slate-400 text-sm">45-60%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-500 rounded"></div>
                                <span className="text-slate-400 text-sm">&lt; 45%</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Botones de exportación */}
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Exportar a PDF
                    </button>
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5" />
                        Exportar a Excel
                    </button>
                    <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Generar Informe Completo
                    </button>
                </div>
            </div>
        );
    };

    // Renderizado principal
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur border-r border-slate-800 z-40">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Vote className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold">VoteSecure</h1>
                            <p className="text-slate-400 text-xs">Admin Panel</p>
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    {[
                        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                        { id: 'upload', icon: Upload, label: 'Carga de Datos' },
                        { id: 'cleaning', icon: Trash2, label: 'Limpieza' },
                        { id: 'training', icon: Brain, label: 'Entrenamiento' },
                        { id: 'visualization', icon: BarChart3, label: 'Visualización' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSection === item.id
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
                    <button
                        onClick={() => {
                            localStorage.removeItem('adminAuth');
                            localStorage.removeItem('adminUser');
                            window.location.href = '/admin/login';
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                {activeSection === 'dashboard' && <Dashboard />}
                {activeSection === 'upload' && <DataUpload />}
                {activeSection === 'cleaning' && <DataCleaning />}
                {activeSection === 'training' && <Training />}
                {activeSection === 'visualization' && <Visualization />}
            </main>
        </div>
    );
}