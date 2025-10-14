import { Link, useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { Toast } from '@/components/ui/toast';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { toast, showToast, hideToast } = useToast();
  
  const login = useLogin({
    onSuccess,
    onError: (error: any) => {
      console.error('Erro no login:', error);
      const message = 
        error?.response?.data?.message || 
        error?.response?.data?.error ||
        error?.message ||
        'Erro ao fazer login. Verifique suas credenciais.';
      showToast(message);
    },
  });
  
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <>
      <div>
        <Form
          onSubmit={(values) => {
            login.mutate(values);
          }}
          schema={loginInputSchema}
        >
          {({ register, formState }) => (
            <>
              <Input
                type="email"
                label="Email Address"
                error={formState.errors['email']}
                registration={register('email')}
              />
              <Input
                type="password"
                label="Password"
                error={formState.errors['password']}
                registration={register('password')}
              />
              <div>
                <Button
                  isLoading={login.isPending}
                  type="submit"
                  className="w-full"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </Form>
        <div className="mt-2 flex items-center justify-end">
          <div className="text-sm">
            <Link
              to={paths.auth.register.getHref(redirectTo)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
        type="error"
      />
    </>
  );
};
