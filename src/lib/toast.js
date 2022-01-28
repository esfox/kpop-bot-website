import { toast } from '@zerodevx/svelte-toast';

const duration = 20000;

export class Toast
{
  static success(message)
  {
    toast.push(message, {
      duration,
      theme: {
        '--toastColor': 'var(--color-success)',
        '--toastBarBackground': 'var(--color-success)',
      },
    });
  }

  static danger(message)
  {
    toast.push(message, {
      duration,
      theme: {
        '--toastColor': 'var(--color-danger)',
        '--toastBarBackground': 'var(--color-danger)',
      },
    });
  }
}
