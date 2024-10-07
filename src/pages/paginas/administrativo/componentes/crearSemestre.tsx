import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// Define the interfaces for data structures
interface Materia {
  codigoMateria: string;
  nombre: string;
  horaIngresoMateria: string;
  horaSalidaMateria: string;
  fechaInicioMateria: string;
  fechaFinMateria: string;
  idAula: number;
}

interface Semestre {
  id: number;
  nroSemestre: number;
}

interface Aula {
  id: number;
  codigoAula: string;
}

interface Carrera {
  id: number;
  nombre: string;
}

const CrearSemestre = () => {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [semestres, setSemestres] = useState<Semestre[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState<Materia[]>([]);
  const { register, handleSubmit, reset, watch } = useForm<{
    carrera: string;
    semestre: string;
    codigoMateria: string;
    nombreMateria: string;
    horaInicio: string;
    horaFin: string;
    fechaInicio: string;
    fechaFin: string;
    aula: string;
  }>();
  const carreraSeleccionada = watch('carrera');
  const semestreSeleccionado = watch('semestre');

  useEffect(() => {
    fetchCarreras();
    fetchAulas();
  }, []);

  useEffect(() => {
    if (carreraSeleccionada) {
      fetchSemestres();
    }
  }, [carreraSeleccionada]);

  useEffect(() => {
    if (semestreSeleccionado) {
      fetchMaterias();
    }
  }, [semestreSeleccionado]);

  const fetchCarreras = async () => {
    try {
      const response = await axios.get<Carrera[]>('/api/obtenerCarreras');
      setCarreras(response.data);
    } catch (error) {
      console.error('Error al obtener carreras:', error);
    }
  };

  const fetchSemestres = async () => {
    try {
      const response = await axios.get<Semestre[]>('/api/obtenerSemestres');
      setSemestres(response.data);
    } catch (error) {
      console.error('Error al obtener semestres:', error);
    }
  };

  const fetchMaterias = async () => {
    try {
      const response = await axios.get<Materia[]>('/api/obtenerMaterias');
      setMaterias(response.data);
    } catch (error) {
      console.error('Error al obtener materias:', error);
    }
  };

  const fetchAulas = async () => {
    try {
      const response = await axios.get<Aula[]>('/api/obtenerAulas');
      setAulas(response.data);
    } catch (error) {
      console.error('Error al obtener aulas:', error);
    }
  };

  const onSubmit = async (data: { carrera: string; semestre: string }) => {
    if (materiasSeleccionadas.length !== 6) {
      alert('Debes seleccionar exactamente 6 materias.');
      return;
    }

    try {
      const response = await axios.post<Semestre>('/api/crearSemestre', {
        nroSemestre: parseInt(data.semestre),
        idCarrera: parseInt(data.carrera),
      });

      const semestreCreado = response.data;

      for (const materia of materiasSeleccionadas) {
        await axios.post('/api/crearMateria', {
          ...materia,
          idSemestre: semestreCreado.id,
        });
      }

      alert('Semestre y materias registrados con éxito');
      reset();
      setMateriasSeleccionadas([]);
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al registrar el semestre y las materias');
    }
  };

  const agregarMateria = (data: any) => {
    if (materiasSeleccionadas.length >= 6) {
      alert('Ya has seleccionado el máximo de 6 materias.');
      return;
    }

    const nuevaMateria: Materia = {
      codigoMateria: data.codigoMateria,
      nombre: data.nombreMateria,
      horaIngresoMateria: data.horaInicio,
      horaSalidaMateria: data.horaFin,
      fechaInicioMateria: data.fechaInicio,
      fechaFinMateria: data.fechaFin,
      idAula: parseInt(data.aula),
    };

    setMateriasSeleccionadas([...materiasSeleccionadas, nuevaMateria]);
    reset({
      carrera: data.carrera,
      semestre: data.semestre,
      codigoMateria: '',
      nombreMateria: '',
      horaInicio: '',
      horaFin: '',
      fechaInicio: '',
      fechaFin: '',
      aula: '',
    });
  };

  const removerMateria = (index: number) => {
    const nuevasMaterias = materiasSeleccionadas.filter((_, i) => i !== index);
    setMateriasSeleccionadas(nuevasMaterias);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Semestre y Materias</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Carrera</label>
          <select {...register('carrera')} className="border p-2">
            <option value="">Selecciona una carrera</option>
            {carreras.map((carrera) => (
              <option key={carrera.id} value={carrera.id}>
                {carrera.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Semestre</label>
          <select {...register('semestre')} className="border p-2">
            <option value="">Selecciona un semestre</option>
            {semestres.map((semestre) => (
              <option key={semestre.id} value={semestre.id}>
                {semestre.nroSemestre}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-xl font-bold mb-2">Agregar Materia</h2>
        <div className="space-y-2">
          <input {...register('codigoMateria')} placeholder="Código de la Materia" className="border p-2 w-full" />
          <input {...register('nombreMateria')} placeholder="Nombre de la Materia" className="border p-2 w-full" />
          <input {...register('horaInicio')} type="time" className="border p-2" />
          <input {...register('horaFin')} type="time" className="border p-2" />
          <input {...register('fechaInicio')} type="date" className="border p-2" />
          <input {...register('fechaFin')} type="date" className="border p-2" />
          <select {...register('aula')} className="border p-2">
            <option value="">Selecciona un aula</option>
            {aulas.map((aula) => (
              <option key={aula.id} value={aula.id}>
                {aula.codigoAula}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleSubmit(agregarMateria)} className="bg-blue-500 text-white p-2">
            Agregar Materia
          </button>
        </div>
        <h3 className="text-lg font-bold mb-2">Materias Seleccionadas</h3>
        <ul className="list-disc pl-5">
          {materiasSeleccionadas.map((materia, index) => (
            <li key={index} className="flex justify-between">
              <span>{materia.nombre}</span>
              <button onClick={() => removerMateria(index)} className="text-red-500">Remover</button>
            </li>
          ))}
        </ul>
        <button type="submit" className="bg-green-500 text-white p-2">Registrar Semestre</button>
      </form>
    </div>
  );
};

export default CrearSemestre;
