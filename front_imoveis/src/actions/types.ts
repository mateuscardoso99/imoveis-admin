export enum UserTypes {
    USER_CREATE = 'USER_CREATE',
    USER_GET_SINGLE = 'USER_GET_SINGLE',
    USER_GET = 'USER_GET',
    USER_UPDATE = 'USER_UPDATE',
    USER_DELETE = 'USER_DELETE'
}

export enum CorretorTypes {
    CORRETOR_CREATE = 'CORRETOR_CREATE',
    CORRETOR_GET_SINGLE = 'CORRETOR_GET_SINGLE',
    CORRETOR_GET = 'CORRETOR_GET',
    CORRETOR_UPDATE = 'CORRETOR_UPDATE',
    CORRETOR_DELETE = 'CORRETOR_DELETE'
}

export enum ImovelTypes {
    IMOVEL_CREATE = 'IMOVEL_CREATE',
    IMOVEL_GET_SINGLE = 'IMOVEL_GET_SINGLE',
    IMOVEL_GET = 'IMOVEL_GET',
    IMOVEL_UPDATE = 'IMOVEL_UPDATE',
    IMOVEL_DELETE = 'IMOVEL_DELETE'
}
/* ---------------------------------------------------- */

export interface User{
    id: number,
    usuario: string
}

export interface Corretor{
    id: number,
    nome: string,
    email: string
    imagem: string,
}

export interface Imovel {
    id: number
    descricao: string
    endereco: string
    detalhes: string
    imagens: []
    latitude: number
    longitude: number
    cidade: string
    uf: string
    valor: number
    id_categoria: number
    id_corretor: number
}

/* ---------------------------------------------------- */

export interface UsersState {
    readonly users: User[]
    readonly user: User
}

export interface CorretoresState {
    readonly corretores: Corretor[]
    readonly corretor: Corretor
}

export interface ImoveisState {
    readonly imoveis: Imovel[]
    readonly imovel: Imovel
}