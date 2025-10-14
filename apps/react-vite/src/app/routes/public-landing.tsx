import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';

const PublicLandingRoute = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="mb-4 text-5xl font-bold text-gray-900">
          Bem-vindo ao App de Nutrição
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Gerencie suas refeições, acompanhe seu progresso e conquiste seus objetivos de saúde
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={() => navigate(paths.auth.login.getHref())}
            className="px-8 py-3 text-lg"
            size="lg"
          >
            Entrar
          </Button>
          
          <Button
            onClick={() => navigate(paths.auth.register.getHref())}
            variant="outline"
            className="px-8 py-3 text-lg"
            size="lg"
          >
            Criar Conta
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl mb-3">🍽️</div>
            <h3 className="font-semibold text-lg mb-2">Avalie Refeições</h3>
            <p className="text-gray-600 text-sm">
              Registre e avalie suas refeições diárias
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-lg mb-2">Veja Relatórios</h3>
            <p className="text-gray-600 text-sm">
              Acompanhe seu progresso com insights detalhados
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-lg mb-2">Ganhe Cupons</h3>
            <p className="text-gray-600 text-sm">
              Conquiste recompensas ao atingir suas metas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLandingRoute;

