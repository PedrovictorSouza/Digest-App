import { Link, useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { Toast } from '@/components/ui/toast';
import { paths } from '@/config/paths';
import { useRegister, registerInputSchema } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { toast, showToast, hideToast } = useToast();
  
  const registering = useRegister({
    onSuccess,
    onError: (error: any) => {
      console.error('Erro no registro:', error);
      const message = 
        error?.response?.data?.message || 
        error?.response?.data?.error ||
        error?.message ||
        'Erro ao criar conta. Verifique os dados e tente novamente.';
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
            registering.mutate(values);
          }}
          schema={registerInputSchema}
        >
          {({ register, formState }) => (
            <>
              <Input
                type="text"
                label="First Name"
                error={formState.errors['firstName']}
                registration={register('firstName')}
              />
              <Input
                type="text"
                label="Last Name"
                error={formState.errors['lastName']}
                registration={register('lastName')}
              />
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
                  isLoading={registering.isPending}
                  type="submit"
                  className="w-full"
                >
                  Register
                </Button>
              </div>
            </>
          )}
        </Form>
        <div className="mt-2 flex items-center justify-end">
          <div className="text-sm">
            <Link
              to={paths.auth.login.getHref(redirectTo)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Log In
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
