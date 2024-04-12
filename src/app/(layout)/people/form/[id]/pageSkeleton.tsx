'use client'

import { Button } from '@/components/ui/button'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ImSpinner9 } from 'react-icons/im'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'

export default function PageSkeleton() {
  // eslint-disable-next-line
    return (
    <div className="flex justify-center">
      <form className="my-10 max-w-[1500px] px-36 xl:px-10">
        <div>
          <div className="flex justify-end gap-5">
            <Button disabled>Voltar</Button>

            <Button disabled>Salvar</Button>
          </div>
          <div className="mb-5 ml-20 flex items-center gap-5">
            <div className="min-w-36 text-left md:min-w-52">
              <label htmlFor="photoUrl">
                <div className="my-auto mr-10 flex flex-col items-center">
                  <Avatar className="size-48 cursor-pointer border-4 border-secondary bg-white">
                    <AvatarFallback>
                      <div className="animate-spin text-primary">
                        <ImSpinner9 />
                      </div>
                    </AvatarFallback>
                  </Avatar>
                  <center>
                    <p className="mx-auto">Clique para editar</p>
                  </center>
                </div>
              </label>
            </div>

            <div className="flex flex-col gap-5">
              <div className="mt-5 flex justify-start gap-5">
                <div className="flex flex-row items-center space-x-1 space-y-0 ">
                  <Checkbox />

                  <div className="space-y-1 leading-none">
                    <label>Cadastro ativo?</label>
                  </div>
                </div>

                <div className="flex flex-row items-center space-x-1 space-y-0 ">
                  <Checkbox />

                  <div className="space-y-1 leading-none">
                    <label>Membro?</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-5">
                <div className="flex flex-1 flex-col gap-5 rounded-lg border border-gray-400 bg-white p-5">
                  <h1 className="text-left">DADOS PESSOAIS</h1>
                  <div className="flex gap-5">
                    <div className="flex-1 text-left">
                      <label className="required">Nome completo</label>

                      <Skeleton className="h-10 w-52 bg-gray-300" />
                    </div>

                    <div className="text-left">
                      <label>Data de nascimento</label>

                      <Skeleton className="h-10 w-52" />
                    </div>

                    <div>
                      <label className="required ">Gênero</label>
                      <Skeleton className="h-10 w-52 bg-gray-300" />
                    </div>
                  </div>

                  {/* Fim - Dt Nascimento e Ativo */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-5 rounded-lg border border-gray-400 bg-white p-5">
            <h1 className="text-left">IGREJA</h1>
            <div className="flex gap-5 text-left">
              <div className="w-full">
                <label>Cargo</label>
                <Skeleton className="h-10 w-40 bg-gray-300"></Skeleton>
              </div>

              <div className="w-full">
                <label>Sociedade</label>
                <Skeleton className="h-10 w-40 bg-gray-300"></Skeleton>
              </div>

              <div className="w-full ">
                <label>Sala EBD</label>
                <Skeleton className="h-10 w-40 bg-gray-300"></Skeleton>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <label>Funções</label>
                  <Skeleton className="h-10 w-40 bg-gray-300" />
                </div>
                <div className="flex gap-2"></div>
              </div>
            </div>

            {/* Fim - Dt Nascimento e Ativo */}
          </div>

          <div className="mt-5 flex flex-col gap-5 rounded-lg border border-gray-400 bg-white p-10">
            <h1 className="text-left text-2xl font-bold">Endereço</h1>

            {/* Início - Informações (Cep, endereço e número) */}
            <div className="flex flex-wrap gap-5">
              <div className="text-left">
                <label>CEP</label>

                <Skeleton className="h-10 w-52" />
              </div>

              {/* Fim - Informações (Cep) */}

              {/* Início - Informações (Endereço e número) */}
              <div className="flex gap-5">
                <div className="text-left">
                  <label>Endereço (sem o número)</label>
                  <Skeleton className="h-10 w-80 bg-gray-300" />
                </div>

                <div className="text-left">
                  <label>Número</label>
                  <Skeleton className="h-10 w-52" />
                </div>
              </div>
            </div>
            {/* Fim - Informações (Cep, endereço e número) */}

            {/* Início - Informações (complemento e bairro) */}
            <div className="flex gap-5 ">
              <div className="flex-1 text-left">
                <label>Complemento</label>
                <Skeleton className="h-10 w-full bg-gray-300" />
              </div>

              <div className="flex-1 text-left">
                <label>Bairro</label>
                <Skeleton className="h-10 w-full bg-gray-300" />
              </div>
            </div>

            {/* Fim - Informações (complemento e bairro) */}

            {/* Início - Informações (cidade e estado) */}
            <div className="flex gap-5">
              <div className="flex-1 text-left">
                <label>Cidade</label>
                <Skeleton className="h-10 w-full bg-gray-300" />
                {/* <Input placeholder="Ex.: São Paulo" className="w-full" /> */}
              </div>

              <div className="flex-1 text-left">
                <label>Estado</label>
                <Skeleton className="h-10 w-full bg-gray-300" />
              </div>
            </div>
            {/* Fim - Informações (cidade e estado) */}
          </div>
        </div>
      </form>
    </div>
  )
}
