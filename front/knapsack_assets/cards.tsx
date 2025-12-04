export interface Card {
  id: string;
  name: string;
  use: number; // porcentaje de uso
  elixir: number;
  img: string; // ruta hacia la imagen
}

// Helper para crear rutas
const img = (file: string) => `/knapsack_assets/cards/${file}`;

// ============================================
// DATOS DE LAS CARTAS
// ============================================
export const cards: Card[] = [
  {
    id: "ariete_de_batalla",
    name: "Ariete de Batalla",
    use: 4,
    elixir: 4,
    img: img("ariete_de_batalla.png"),
  },

  {
    id: "arqueras",
    name: "Arqueras",
    use: 3,
    elixir: 3,
    img: img("arqueras.png"),
  },

  {
    id: "arquero_magico",
    name: "Arquero Mágico",
    use: 3,
    elixir: 4,
    img: img("arquero_magico.png"),
  },

  {
    id: "ballesta",
    name: "Ballesta",
    use: 2,
    elixir: 6,
    img: img("ballesta.png"),
  },

  {
    id: "bandida",
    name: "Bandida",
    use: 6,
    elixir: 3,
    img: img("bandida.png"),
  },
  {
    id: "bandida_lider",
    name: "Bandida Líder",
    use: 3,
    elixir: 6,
    img: img("bandida_lider.png"),
  },

  {
    id: "barbaros",
    name: "Bárbaros",
    use: 1,
    elixir: 5,
    img: img("barbaros.png"),
  },

  {
    id: "barbaros_de_elite",
    name: "Bárbaros de Élite",
    use: 2,
    elixir: 6,
    img: img("barbaros_de_elite.png"),
  },

  {
    id: "barril_de_barbaro",
    name: "Barril de Bárbaro",
    use: 27,
    elixir: 2,
    img: img("barril_de_barbaro.png"),
  },

  {
    id: "barril_de_duendes",
    name: "Barril de Duendes",
    use: 5,
    elixir: 3,
    img: img("barril_de_duendes.png"),
  },

  {
    id: "barril_de_esqueletos",
    name: "Barril de Esqueletos",
    use: 8,
    elixir: 3,
    img: img("barril_de_esqueletos.png"),
  },

  {
    id: "bebe_dragon",
    name: "Bebé Dragón",
    use: 7,
    elixir: 4,
    img: img("bebe_dragon.png"),
  },

  {
    id: "berserker",
    name: "Berserker",
    use: 4,
    elixir: 2,
    img: img("berserker.png"),
  },

  {
    id: "bola_de_fuego",
    name: "Bola de Fuego",
    use: 24,
    elixir: 4,
    img: img("bola_de_fuego.png"),
  },

  {
    id: "bola_de_nieve",
    name: "Bola de Nieve",
    use: 3,
    elixir: 2,
    img: img("bola_de_nieve.png"),
  },

  {
    id: "bombardero",
    name: "Bombardero",
    use: 2,
    elixir: 2,
    img: img("bombardero.png"),
  },

  { id: "bruja", name: "Bruja", use: 8, elixir: 5, img: img("bruja.png") },

  {
    id: "bruja_madre",
    name: "Bruja Madre",
    use: 4,
    elixir: 4,
    img: img("bruja_madre.png"),
  },

  {
    id: "bruja_nocturna",
    name: "Bruja Nocturna",
    use: 2,
    elixir: 4,
    img: img("bruja_nocturna.png"),
  },

  {
    id: "caballero",
    name: "Caballero",
    use: 9,
    elixir: 3,
    img: img("caballero.png"),
  },

  {
    id: "caballero_dorado",
    name: "Caballero Dorado",
    use: 6,
    elixir: 4,
    img: img("caballero_dorado.png"),
  },

  {
    id: "cazador",
    name: "Cazador",
    use: 4,
    elixir: 4,
    img: img("cazador.png"),
  },

  { id: "cañon", name: "Cañón", use: 8, elixir: 3, img: img("cañon.png") },

  {
    id: "cañon_con_ruedas",
    name: "Cañón con Ruedas",
    use: 3,
    elixir: 5,
    img: img("cañon_con_ruedas.png"),
  },

  {
    id: "cementerio",
    name: "Cementerio",
    use: 4,
    elixir: 5,
    img: img("cementerio.png"),
  },

  {
    id: "chispitas",
    name: "Chispitas",
    use: 3,
    elixir: 6,
    img: img("chispitas.png"),
  },

  {
    id: "choza_de_barbaros",
    name: "Choza de Bárbaros",
    use: 0,
    elixir: 6,
    img: img("choza_de_barbaros.png"),
  },

  {
    id: "choza_de_duendes",
    name: "Choza de Duendes",
    use: 4,
    elixir: 4,
    img: img("choza_de_duendes.png"),
  },

  { id: "clon", name: "Clon", use: 1, elixir: 3, img: img("clon.png") },

  { id: "cohete", name: "Cohete", use: 6, elixir: 6, img: img("cohete.png") },

  {
    id: "curandera",
    name: "Curandera de Batalla",
    use: 3,
    elixir: 4,
    img: img("curandera.png"),
  },

  {
    id: "demoledor_duende",
    name: "Demoledor Duende",
    use: 1,
    elixir: 4,
    img: img("demoledor_duende.png"),
  },

  {
    id: "descarga",
    name: "Descarga (Zap)",
    use: 11,
    elixir: 2,
    img: img("descarga.png"),
  },

  {
    id: "dragones_esqueleto",
    name: "Dragones Esqueleto",
    use: 1,
    elixir: 4,
    img: img("dragones_esqueleto.png"),
  },

  {
    id: "dragon_electrico",
    name: "Dragón Eléctrico",
    use: 5,
    elixir: 4,
    img: img("dragon_electrico.png"),
  },

  {
    id: "dragon_infernal",
    name: "Dragón Infernal",
    use: 3,
    elixir: 4,
    img: img("dragon_infernal.png"),
  },

  {
    id: "duendenstein",
    name: "Duendenstein",
    use: 1,
    elixir: 5,
    img: img("duendenstein.png"),
  },

  {
    id: "duendes",
    name: "Duendes",
    use: 2,
    elixir: 2,
    img: img("duendes.png"),
  },

  {
    id: "duendes_con_lanza",
    name: "Duendes con Lanza",
    use: 2,
    elixir: 2,
    img: img("duendes_con_lanza.png"),
  },

  {
    id: "duende_gigante",
    name: "Duende Gigante",
    use: 1,
    elixir: 6,
    img: img("duende_gigante.png"),
  },

  {
    id: "ejercito_de_esqueletos",
    name: "Ejército de Esqueletos",
    use: 6,
    elixir: 3,
    img: img("ejercito_de_esqueletos.png"),
  },

  {
    id: "electrocutadores",
    name: "Electrocutadores",
    use: 6,
    elixir: 4,
    img: img("electrocutadores.png"),
  },

  {
    id: "el_tronco",
    name: "El Tronco",
    use: 28,
    elixir: 2,
    img: img("el_tronco.png"),
  },

  {
    id: "emperatriz_espiritual",
    name: "Emperatriz Espiritual",
    use: 1,
    elixir: 6,
    img: img("emperatriz_espiritual.png"),
  },

  {
    id: "enredadera",
    name: "Enredadera",
    use: 12,
    elixir: 3,
    img: img("enredadera.png"),
  },

  {
    id: "esbirros",
    name: "Esbirros",
    use: 10,
    elixir: 3,
    img: img("esbirros.png"),
  },

  { id: "espejo", name: "Espejo", use: 2, elixir: 0, img: img("espejo.png") },

  {
    id: "espiritu_de_fuego",
    name: "Espíritu de Fuego",
    use: 3,
    elixir: 1,
    img: img("espiritu_de_fuego.png"),
  },

  {
    id: "espiritu_de_hielo",
    name: "Espíritu de Hielo",
    use: 15,
    elixir: 1,
    img: img("espiritu_de_hielo.png"),
  },

  {
    id: "espiritu_electrico",
    name: "Espíritu Eléctrico",
    use: 13,
    elixir: 1,
    img: img("espiritu_electrico.png"),
  },

  {
    id: "espiritu_sanador",
    name: "Espíritu Sanador",
    use: 2,
    elixir: 1,
    img: img("espiritu_sanador.png"),
  },

  {
    id: "esqueletos",
    name: "Esqueletos",
    use: 21,
    elixir: 1,
    img: img("esqueletos.png"),
  },

  {
    id: "esqueleto_gigante",
    name: "Esqueleto Gigante",
    use: 3,
    elixir: 6,
    img: img("esqueleto_gigante.png"),
  },

  {
    id: "excavadora",
    name: "Excavadora de Duendes",
    use: 2,
    elixir: 4,
    img: img("excavadora.png"),
  },

  {
    id: "fantasma_real",
    name: "Fantasma Real",
    use: 14,
    elixir: 3,
    img: img("fantasma_real.png"),
  },

  { id: "fenix", name: "Fénix", use: 1, elixir: 4, img: img("fenix.png") },

  {
    id: "flechas",
    name: "Flechas",
    use: 26,
    elixir: 3,
    img: img("flechas.png"),
  },

  { id: "furia", name: "Furia", use: 4, elixir: 2, img: img("furia.png") },

  {
    id: "gigante",
    name: "Gigante",
    use: 4,
    elixir: 5,
    img: img("gigante.png"),
  },

  {
    id: "gigante_electrico",
    name: "Gigante Eléctrico",
    use: 2,
    elixir: 7,
    img: img("gigante_electrico.png"),
  },

  {
    id: "gigante_noble",
    name: "Gigante Noble",
    use: 5,
    elixir: 6,
    img: img("gigante_noble.png"),
  },

  {
    id: "gigante_runica",
    name: "Gigante Rúnico",
    use: 0,
    elixir: 4,
    img: img("gigante_runica.png"),
  },

  { id: "globo", name: "Globo", use: 9, elixir: 5, img: img("globo.png") },

  { id: "golem", name: "Gólem", use: 6, elixir: 8, img: img("golem.png") },

  {
    id: "golem_de_elixir",
    name: "Gólem de Elixir",
    use: 3,
    elixir: 3,
    img: img("golem_de_elixir.png"),
  },

  {
    id: "golem_de_hielo",
    name: "Gólem de Hielo",
    use: 7,
    elixir: 2,
    img: img("golem_de_hielo.png"),
  },

  {
    id: "gran_minero",
    name: "Gran Minero",
    use: 4,
    elixir: 4,
    img: img("gran_minero.png"),
  },

  {
    id: "guardias",
    name: "Guardias",
    use: 6,
    elixir: 3,
    img: img("guardias.png"),
  },

  { id: "hielo", name: "Hielo", use: 3, elixir: 4, img: img("hielo.png") },

  {
    id: "horda_de_esbirros",
    name: "Horda de Esbirros",
    use: 2,
    elixir: 5,
    img: img("horda_de_esbirros.png"),
  },

  { id: "horno", name: "Horno", use: 2, elixir: 4, img: img("horno.png") },

  {
    id: "jaula_del_forzudo",
    name: "Jaula del Forzudo",
    use: 4,
    elixir: 4,
    img: img("jaula_del_forzudo.png"),
  },

  {
    id: "lanzafuegos",
    name: "Lanzafuegos",
    use: 10,
    elixir: 3,
    img: img("lanzafuegos.png"),
  },

  {
    id: "lanzarrocas",
    name: "Lanzarrocas",
    use: 4,
    elixir: 5,
    img: img("lanzarrocas.png"),
  },

  {
    id: "lanza_dardos",
    name: "Lanza Dardos",
    use: 11,
    elixir: 3,
    img: img("lanza_dardos.png"),
  },

  { id: "lapida", name: "Lápida", use: 3, elixir: 3, img: img("lapida.png") },

  {
    id: "leñador",
    name: "Leñador",
    use: 5,
    elixir: 4,
    img: img("leñador.png"),
  },

  { id: "mago", name: "Mago", use: 3, elixir: 5, img: img("mago.png") },

  {
    id: "mago_de_hielo",
    name: "Mago de Hielo",
    use: 6,
    elixir: 3,
    img: img("mago_de_hielo.png"),
  },

  {
    id: "mago_electrico",
    name: "Mago Eléctrico",
    use: 9,
    elixir: 4,
    img: img("mago_electrico.png"),
  },

  {
    id: "maldicion_duende",
    name: "Maldición Duende",
    use: 1,
    elixir: 2,
    img: img("maldicion_duende.png"),
  },

  {
    id: "maquina_duende",
    name: "Máquina Duende",
    use: 0,
    elixir: 5,
    img: img("maquina_duende.png"),
  },

  {
    id: "maquina_voladora",
    name: "Máquina Voladora",
    use: 4,
    elixir: 4,
    img: img("maquina_voladora.png"),
  },

  {
    id: "megacaballero",
    name: "Megacaballero",
    use: 13,
    elixir: 7,
    img: img("megacaballero.png"),
  },

  {
    id: "megaesbirro",
    name: "Megaesbirro",
    use: 3,
    elixir: 3,
    img: img("megaesbirro.png"),
  },

  { id: "minero", name: "Minero", use: 7, elixir: 3, img: img("minero.png") },

  {
    id: "mini_pekka",
    name: "Mini P.E.K.K.A",
    use: 14,
    elixir: 4,
    img: img("mini_pekka.png"),
  },

  { id: "monje", name: "Monje", use: 2, elixir: 5, img: img("monje.png") },

  {
    id: "montacarneros",
    name: "Montacarneros",
    use: 2,
    elixir: 5,
    img: img("montacarneros.png"),
  },

  {
    id: "montapuercos",
    name: "Montapuercos",
    use: 17,
    elixir: 4,
    img: img("montapuercos.png"),
  },

  {
    id: "mortero",
    name: "Mortero",
    use: 5,
    elixir: 4,
    img: img("mortero.png"),
  },

  {
    id: "mosquetera",
    name: "Mosquetera",
    use: 4,
    elixir: 4,
    img: img("mosquetera.png"),
  },

  {
    id: "murcielagos",
    name: "Murciélagos",
    use: 6,
    elixir: 2,
    img: img("murcielagos.png"),
  },

  {
    id: "pandilla_de_duendes",
    name: "Pandilla de Duendes",
    use: 14,
    elixir: 3,
    img: img("pandilla_de_duendes.png"),
  },

  {
    id: "paquete_real",
    name: "Paquete Real",
    use: 4,
    elixir: 3,
    img: img("paquete_real.png"),
  },

  { id: "pekka", name: "P.E.K.K.A", use: 4, elixir: 7, img: img("pekka.png") },

  {
    id: "pescador",
    name: "Pescador",
    use: 5,
    elixir: 3,
    img: img("pescador.png"),
  },

  { id: "pillos", name: "Pillos", use: 3, elixir: 5, img: img("pillos.png") },

  {
    id: "princesa",
    name: "Princesa",
    use: 6,
    elixir: 3,
    img: img("princesa.png"),
  },

  {
    id: "principe",
    name: "Príncipe",
    use: 5,
    elixir: 5,
    img: img("principe.png"),
  },

  {
    id: "principe_oscuro",
    name: "Príncipe Oscuro",
    use: 4,
    elixir: 4,
    img: img("principe_oscuro.png"),
  },

  {
    id: "principito",
    name: "Principito",
    use: 1,
    elixir: 3,
    img: img("principito.png"),
  },

  {
    id: "puercos_reales",
    name: "Puercos Reales",
    use: 6,
    elixir: 5,
    img: img("puercos_reales.png"),
  },

  { id: "rayo", name: "Rayo", use: 10, elixir: 6, img: img("rayo.png") },

  {
    id: "reclutas_reales",
    name: "Reclutas Reales",
    use: 5,
    elixir: 7,
    img: img("reclutas_reales.png"),
  },

  {
    id: "recolector_de_elixir",
    name: "Recolector de Elixir",
    use: 4,
    elixir: 6,
    img: img("recolector_de_elixir.png"),
  },

  {
    id: "reina_arquera",
    name: "Reina Arquera",
    use: 4,
    elixir: 5,
    img: img("reina_arquera.png"),
  },

  {
    id: "rey_esqueleto",
    name: "Rey Esqueleto",
    use: 4,
    elixir: 4,
    img: img("rey_esqueleto.png"),
  },

  {
    id: "rompemuros",
    name: "Rompemuros",
    use: 4,
    elixir: 2,
    img: img("rompemuros.png"),
  },

  {
    id: "sabueso_de_lava",
    name: "Sabueso de Lava",
    use: 3,
    elixir: 7,
    img: img("sabueso_de_lava.png"),
  },

  {
    id: "terremoto",
    name: "Terremoto",
    use: 6,
    elixir: 3,
    img: img("terremoto.png"),
  },

  {
    id: "tornado",
    name: "Tornado",
    use: 10,
    elixir: 3,
    img: img("tornado.png"),
  },

  {
    id: "torre_bombardera",
    name: "Torre Bombardera",
    use: 4,
    elixir: 4,
    img: img("torre_bombardera.png"),
  },

  {
    id: "torre_infernal",
    name: "Torre Infernal",
    use: 5,
    elixir: 5,
    img: img("torre_infernal.png"),
  },

  {
    id: "torre_tesla",
    name: "Torre Tesla",
    use: 6,
    elixir: 4,
    img: img("torre_tesla.png"),
  },

  {
    id: "trio_de_mosqueteras",
    name: "Trío de Mosqueteras",
    use: 3,
    elixir: 9,
    img: img("trio_de_mosqueteras.png"),
  },

  {
    id: "valquiria",
    name: "Valquiria",
    use: 15,
    elixir: 4,
    img: img("valquiria.png"),
  },

  { id: "veneno", name: "Veneno", use: 7, elixir: 4, img: img("veneno.png") },

  {
    id: "verdugo",
    name: "Verdugo",
    use: 5,
    elixir: 5,
    img: img("verdugo.png"),
  },
];
