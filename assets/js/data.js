import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/**
 * Exemple de moyennes d'étudiants
 * @type {[{studentName: string, moyenne: number},{studentName: string, moyenne: number},{studentName: string, moyenne: number},{studentName: string, moyenne: number}]}
 */
const moyennes = [
  {studentName: 'John', moyenne: 13},
  {studentName: 'Jane', moyenne: 16},
  {studentName: 'Jack', moyenne: 7},
  {studentName: 'Jim', moyenne: 11},
]


/**
 * Récupère les dimensions du navigateur
 * @type {number}
 */
const width = window.innerWidth;
const height = window.innerHeight;

/**
 * Création du SVG. L'insertion dans le DOM s'effectue en bas
 */
const svg = d3.create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr('viewBox', `0 0 ${width} ${height}`);


/**
 * Génère une abscisse aléatoire entre 0 et width
 * @return {number}
 */
const randomX = () => {
  return Math.random() * width
};

/**
 * Génère une ordonéne aléatoire entre 0 et height
 * @return {number}
 */
const randomY = () => {
  return Math.random() * height
};

/**
 * Génère une couleur aléatoire pour le cercle
 * @return {string}
 */
const randomColor = () => {
  const valeurCercle = Math.floor(Math.random() * (256 ** 3));

  return colorToString(valeurCercle)
}

/**
 * Retourne une couleur au format #1A2B3C à partir d'une valeur décimale
 * @param {number}value
 * @return {`#${string}`}
 */
const colorToString = (value) => {
  return `#${value.toString(16).padStart(6, '0')}`
}

/**
 * Trouve la couleur complémentaire de value
 * @param {string}value Couleur au format #1A2B3C
 */
const complementaryColor = (value) => {
  const valeurCercle =  parseInt(value.replace('#', ''), 16);
  const valeurTexte = ~valeurCercle & 0xFFFFFF;

  return colorToString(valeurTexte)

}

/**
 * Construction des 'circle' dans le SVG. La référence est conservé
 * pour y ajouter le texte par la suite
 */
svg.selectAll()
  .data(moyennes, d => d.studentName)
  .join('circle')
  .attr('cx', randomX)
  .attr('cy', randomY)
  .attr('r', d => d.moyenne * 2)
  .attr('fill', () => randomColor())
  .attr('id', d => d.studentName)

/**
 * Ajout dans le DOM du SVG construit
 */
document.body.append(svg.node())


/**
 * Ajoute le texte associé à chaque 'circle'. La position d'un cercle est
 * retrouvé grâce à la méthode avec un selecteur sur id. Ne fonctionne que si le SVG
 * est déjà dans le DOM. On retrouve les coordonnées des cercles pour fixe
 * le texte
 */
svg.selectAll()
  .data(moyennes, d => d.studentName)
  .join('text')
  .text(d => d.studentName)
  .attr('x', (d) => d3.select(`#${d.studentName}`).attr("cx"))
  .attr('y', (d) => d3.select(`#${d.studentName}`).attr("cy"))
  .attr('fill', (d) => {
    const stringColor = d3.select(`#${d.studentName}`).attr("fill")
    return complementaryColor(stringColor)
  })

console.log(colorToString(0x671D5B))
console.log(colorToString(0x98E2A4))