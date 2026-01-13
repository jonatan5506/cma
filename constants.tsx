
import React from 'react';
import { DoctorProfile, UserRole } from './types';

export const CLINIC_NAME = "Centro Médico Avançado";
export const CLINIC_SUBTITLE = "Dermatologia e Cirurgia Dermatológica";

export const SERVICE_CATEGORIES = [
  {
    id: 'dermato',
    name: 'Dermatologia Clínica',
    icon: '🏥',
    services: [
      { id: 'acne', name: 'Tratamento de Acne', price: 250 },
      { id: 'mmp', name: 'Microperfusão (MMP)', price: 450 },
      { id: 'peeling', name: 'Peeling Químico', price: 350 }
    ]
  },
  {
    id: 'estetica',
    name: 'Estética Avançada',
    icon: '✨',
    services: [
      { id: 'botox', name: 'Aplicação de Botox', price: 1200 },
      { id: 'preenchimento', name: 'Preenchimento Facial', price: 1500 },
      { id: 'laser', name: 'Laser Terapêutico', price: 600 }
    ]
  },
  {
    id: 'cirurgia',
    name: 'Cirurgia Dermatológica',
    icon: '✂️',
    services: [
      { id: 'biopsia', name: 'Biópsia de Pele', price: 400 },
      { id: 'excision', name: 'Excisão de Lesões', price: 800 }
    ]
  }
];

export const DOCTORS_DATA: DoctorProfile[] = [
  {
    name: "Dra. Marília Nogueira",
    education: [
      "Graduação – UFF",
      "Residência (pós-graduação) em Dermatologia – UERJ"
    ],
    photo: "https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-teal-100"
  },
  {
    name: "Dra. Laís Abreu Menicucci",
    education: [
      "Graduação – UFRJ",
      "Residência (pós-graduação) em Dermatologia – UFF",
      "Mestrado – UFF"
    ],
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-purple-100"
  },
  {
    name: "Dra. Adriane Afonso Lima",
    education: [
      "Graduação – UFF",
      "Residência (pós-graduação) em Dermatologia – UFF"
    ],
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400",
    bgColor: "bg-blue-100"
  }
];

export const INSTALLATIONS_IMAGES = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1504813184591-01592f259721?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
];

export const TREATMENTS = [
  {
    title: "Microperfusão de Medicamentos – MMP",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Botox e Preenchimento Facial",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Cirurgia Dermatológica Avançada",
    image: "https://images.unsplash.com/photo-1579154234431-da67814c021d?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Tratamento Especializado de Acne",
    image: "https://images.unsplash.com/photo-1581056316607-a60d8a3bb368?auto=format&fit=crop&q=80&w=1600"
  }
];
