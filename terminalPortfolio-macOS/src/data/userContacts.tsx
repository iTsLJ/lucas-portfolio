export interface Contact {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string;
  icon: string;
}

export const userProfile = {
  name: 'Lucas Ferreira',
  title: 'Jr. Software Engineer',
  subtitle: 'BUILDING FOR THE FUTURE',
  avatar: '/avatar.jpeg',
};

export const userContacts: Contact[] = [
  {
    id: 'email',
    type: 'Email',
    title: 'Email',
    description: 'lucasjlopesferreira@gmail.com',
    url: 'mailto:lucasjlopesferreira@gmail.com',
    icon: '✉️',
  },
  {
    id: 'github',
    type: 'GitHub',
    title: 'GitHub',
    description: '@iTsLJ',
    url: 'https://github.com/iTsLJ',
    icon: '🐙',
  },
  {
    id: 'linkedin',
    type: 'LinkedIn',
    title: 'LinkedIn',
    description: 'Connect professionally',
    url: 'https://www.linkedin.com/in/lucas-ferreira10/',
    icon: '💼',
  },
  {
    id: 'whatsapp',
    type: 'WhatsApp',
    title: 'WhatsApp',
    description: '+55 31 99770-8250',
    url: 'https://wa.me/5531997708250',
    icon: '💬',
  },
];
