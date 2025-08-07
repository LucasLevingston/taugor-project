import React from 'react'
import {
  DataFormatada,
  formatarDataHistorico,
  formatarTelefone,
} from '@/estatico'
import { EmployeeType } from '@/types/employee-type'

interface PDFViewerProps {
  employee: EmployeeType
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ employee }) => {
  return (
    <div className="m-24 space-y-16 p-20" id="conteudoPDF" key={employee.uid}>
      <div className="w-full ">
        <div className="pb-7 text-7xl font-bold">Informações de Contato</div>
        <div className="flex">
          <div className="flex w-[60%] flex-col ">
            <div className="w-full space-y-10">
              <div className="h-13 p-2 ">
                <h1 className="text-2xl font-bold">Nome</h1>
                <h2 className="text-3xl">{employee.name}</h2>
              </div>
              <div className="h-13 p-2 ">
                <h1 className="text-2xl font-bold">Email</h1>
                <h2 className="text-3xl">{employee.email}</h2>
              </div>
              <div className="flex space-x-10 ">
                <div className="h-13  p-2">
                  <h1 className="text-2xl font-bold">Rua</h1>
                  <h2 className="text-3xl">{employee.street}</h2>
                </div>
                <div className="h-13 p-2 ">
                  <h1 className="text-2xl font-bold">Número</h1>
                  <h2 className="text-3xl">{employee.number}</h2>
                </div>
              </div>
              <div className="h-13  p-2 ">
                <h1 className="text-2xl font-bold">CEP</h1>
                <h2 className="text-3xl">{employee.zipCode}</h2>
              </div>
              <div className="flex space-x-10">
                <div className="h-13 w-[40%] p-2">
                  <h1 className="text-2xl font-bold">Cidade</h1>
                  <h2 className="text-3xl">{employee.city}</h2>
                </div>
                <div className="h-13  p-2 ">
                  <h1 className="text-2xl font-bold">Estado</h1>
                  <h2 className="text-3xl">{employee.state}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-10  p-2">
            <div className="p-2">
              <h1 className="text-2xl font-bold">Sexo</h1>
              <h2 className="text-3xl">{employee.gender}</h2>
            </div>
            <div className="p-2">
              <h1 className="text-2xl font-bold">Número de Celular</h1>
              <h2 className="text-3xl">
                {formatarTelefone(employee.phoneNumber)}
              </h2>
            </div>
            <div className="p-2">
              <h1 className="text-2xl font-bold">Data de Aniversário</h1>
              <h2 className="text-3xl">{DataFormatada(employee.birthDate)}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="pb-7 text-7xl font-bold">
          Informações de Funcionário
        </div>
        <div className="flex w-full">
          <div className=" w-[60%] space-y-10 ">
            <div className="h-13  p-2 ">
              <h1 className="text-2xl font-bold">Setor</h1>
              <h2 className="text-3xl">{employee.department}</h2>
            </div>
            <div className="h-13  p-2 ">
              <h1 className="text-2xl font-bold">Cargo</h1>

              <h2 className="text-3xl">{employee.position}</h2>
            </div>
          </div>
          <div className="space-y-10">
            <div className="h-13  p-2 ">
              <h1 className="text-2xl font-bold">Salário</h1>
              <h2 className="text-3xl">R$ {employee.salary}</h2>
            </div>
            <div className="h-13  p-2 ">
              <h1 className="text-2xl font-bold">Data de Admissão</h1>
              <h2 className="text-3xl">
                {DataFormatada(employee.admissionDate)}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col space-y-10 p-2">
        <div className="pb-7 text-7xl font-bold">Histórico:</div>
        {employee.history.map(caso => (
          <div className="" key={caso.date}>
            <h1 className="text-3xl font-bold">
              Ocorrido:<span className="font-normal"> {caso.action}</span>
            </h1>
            <h2 className=" py-10  text-3xl font-bold">
              Data:
              <span className="font-normal">
                {' '}
                {formatarDataHistorico(caso.date)}
              </span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PDFViewer
