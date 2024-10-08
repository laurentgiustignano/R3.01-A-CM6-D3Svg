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
 * Génère deux couleurs aléatoires et complémentaire pour
 * le texte et le cercle
 * @return {string[]}
 */
const randomColor = () => {
  const valeurTexte = Math.floor(Math.random() * (256 ** 3));
  const valeurCercle = ~valeurTexte  & 0xFFFFFF;

  return [
    `#${valeurCercle.toString(16).padStart(6, '0')}`,
    `#${valeurTexte.toString(16).padStart(6, '0')}`]
}

/**
 * Construction des 'circle' dans le SVG. La référence est conservé
 * pour y ajouter le texte par la suite
 */
const circles = svg.selectAll()
  .data(moyennes, d => d.studentName)
  .join('circle')
  .attr('cx', randomX)
  .attr('cy', randomY)
  .attr('r', d => d.moyenne * 2)
  .attr('fill', d => randomColor()[0])


/**
 * Ajoute le texte associé à chaque 'circle'. La position d'un cercle est
 * retrouvé grâce à la méthode nodes() et en retrouve les propriétés des
 * coordonnées
 */
svg.selectAll()
  .data(moyennes, d => d.studentName)
  .join('text')
  .attr('x', (d, i) => {
    return circles.nodes()[i].getAttribute('cx');
  })
  .attr('y', (d, i) => {
    return circles.nodes()[i].getAttribute('cy') - 10;
  })
  .text(d => d.studentName)
  .attr('fill', d => randomColor()[1])


/**
 * Ajout dans le DOM du SVG construit
 */
document.body.append(svg.node())