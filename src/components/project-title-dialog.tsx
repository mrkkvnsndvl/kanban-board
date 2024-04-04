import { FolderPen } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { useLoadingStore } from '@/_stores/loading-store';
import { useProjectTitleStore } from '@/_stores/project-title-store';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import ProjectTitleSkeleton from './project-title-skeleton';

export default function ProjectTitleDialog() {
  const projectTitle = useProjectTitleStore((state) => state.projectTitle);
  const setTitle = useProjectTitleStore((state) => state.setProjectTitle);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const { projectTitle } = Object.fromEntries(formData);
    if (typeof projectTitle !== 'string') return;
    setTitle(projectTitle);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className='flex items-center'>
      {isLoading ? (
        <ProjectTitleSkeleton />
      ) : (
        <span className='mr-1 text-sm font-medium leading-none sm:mr-2'>
          {projectTitle === '' ? 'Untitled' : projectTitle}
        </span>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' size='sm'>
            <FolderPen className='w-4 h-4' />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className='text-start'>
            <DialogTitle>Project Title</DialogTitle>
            <DialogDescription>
              {projectTitle !== '' ? 'Change' : 'Create'} your project title
              here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form
            className='flex flex-col items-start gap-y-2'
            id='project-title-form'
            onSubmit={handleSubmit}>
            <Label htmlFor='projectTitle'>Project Title</Label>
            <Input
              type='text'
              id='projectTitle'
              name='projectTitle'
              defaultValue={projectTitle}
              required
            />
          </form>
          <DialogFooter className='gap-y-2'>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <DialogTrigger asChild>
              <Button type='submit' form='project-title-form'>
                Save changes
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
