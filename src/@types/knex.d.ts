/* eslint-disable */
// Fui obrigado a declarar a variável para manter. Os formatadores ou o VS Code estava me forçando a remover de qual forma o import, mesmo utilizando  //eslint-disable-next-line

import type { Knex } from 'knex'

const _knex: Knex = {} as any

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      session_id?: string
    }
  }
}
