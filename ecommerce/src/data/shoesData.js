// Local shoes data with images
import airJordan1Low from '../assets/images/AIRJORDAN1LOW.jpg'
import airJordan1Low1 from '../assets/images/AIRJORDAN1LOW (1).jpg'
import airJordan1Low2 from '../assets/images/AIRJORDAN1LOW (2).jpg'
import airJordan1Low3 from '../assets/images/AIRJORDAN1LOW (3).jpg'
import airJordan1Low4 from '../assets/images/AIRJORDAN1LOW (4).jpg'

import airZoomPegasus from '../assets/images/AIRZOOMPEGASUS41.jpg'
import airZoomPegasus1 from '../assets/images/AIRZOOMPEGASUS41 (1).jpg'
import airZoomPegasus2 from '../assets/images/AIRZOOMPEGASUS41 (2).jpg'
import airZoomPegasus3 from '../assets/images/AIRZOOMPEGASUS41 (3).jpg'
import airZoomPegasus4 from '../assets/images/AIRZOOMPEGASUS41 (4).jpg'

import gtJumpAcademy from '../assets/images/G.T.JUMPACADEMYEP.jpg'
import gtJumpAcademy1 from '../assets/images/G.T.JUMPACADEMYEP (1).jpg'
import gtJumpAcademy2 from '../assets/images/G.T.JUMPACADEMYEP (2).jpg'
import gtJumpAcademy3 from '../assets/images/G.T.JUMPACADEMYEP (3).jpg'
import gtJumpAcademy4 from '../assets/images/G.T.JUMPACADEMYEP (4).jpg'

import jordanAirRev from '../assets/images/JORDAN+AIR+REV.jpg'
import jordanAirRev1 from '../assets/images/JORDAN+AIR+REV (1).jpg'
import jordanAirRev2 from '../assets/images/JORDAN+AIR+REV (2).jpg'
import jordanAirRev3 from '../assets/images/JORDAN+AIR+REV (3).jpg'
import jordanAirRev4 from '../assets/images/JORDAN+AIR+REV (4).jpg'

import legend10Elite from '../assets/images/LEGEND10ELITEFG.jpg'
import legend10Elite1 from '../assets/images/LEGEND10ELITEFG (1).jpg'
import legend10Elite2 from '../assets/images/LEGEND10ELITEFG (2).jpg'
import legend10Elite3 from '../assets/images/LEGEND10ELITEFG (3).jpg'
import legend10Elite4 from '../assets/images/LEGEND10ELITEFG (4).jpg'

import nikeDunkLow from '../assets/images/NIKEDUNKLOWRETRO.jpg'
import nikeDunkLow1 from '../assets/images/NIKEDUNKLOWRETRO(1).jpg'
import nikeDunkLow2 from '../assets/images/NIKEDUNKLOWRETRO(2).jpg'
import nikeDunkLow3 from '../assets/images/NIKEDUNKLOWRETR(3).jpg'
import nikeDunkLow4 from '../assets/images/NIKEDUNKLOWRETRO(4).jpg'

import nikeP6000 from '../assets/images/NIKEP-6000PRM.jpg'
import nikeP60001 from '../assets/images/NIKEP-6000PRM (1).jpg'
import nikeP60002 from '../assets/images/NIKEP-6000PRM (2).jpg'
import nikeP60003 from '../assets/images/NIKEP-6000PRM (3).jpg'
import nikeP60004 from '../assets/images/NIKEP-6000PRM (4).jpg'

import phantom6Elite from '../assets/images/PHANTOM6HIGHELITELEFG.jpg'
import phantom6Elite1 from '../assets/images/PHANTOM6HIGHELITELEFG (1).jpg'
import phantom6Elite2 from '../assets/images/PHANTOM6HIGHELITELEFG (2).jpg'
import phantom6Elite3 from '../assets/images/PHANTOM6HIGHELITELEFG (3).jpg'
import phantom6Elite4 from '../assets/images/PHANTOM6HIGHELITELEFG (4).jpg'

export const localShoesData = [
  {
    id: 1,
    name: 'Air Jordan 1 Low',
    price: 4995,
    color: 'White/Black',
    rating: 4.8,
    image: airJordan1Low,
    images: [airJordan1Low, airJordan1Low1, airJordan1Low2, airJordan1Low3, airJordan1Low4],
    description: 'The Air Jordan 1 Low offers all the appeal of the original AJ1 with a more versatile, everyday wearable aesthetic.',
    category: 'casual',
    brand: 'Jordan',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    inStock: true
  },
  {
    id: 2,
    name: 'Air Zoom Pegasus 41',
    price: 6895,
    color: 'Black/White',
    rating: 4.9,
    image: airZoomPegasus,
    images: [airZoomPegasus, airZoomPegasus1, airZoomPegasus2, airZoomPegasus3, airZoomPegasus4],
    description: 'Responsive cushioning in the Pegasus provides an energized ride for everyday road running.',
    category: 'running',
    brand: 'Nike',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    inStock: true
  },
  {
    id: 3,
    name: 'G.T. Jump Academy EP',
    price: 5495,
    color: 'Blue/White',
    rating: 4.7,
    image: gtJumpAcademy,
    images: [gtJumpAcademy, gtJumpAcademy1, gtJumpAcademy2, gtJumpAcademy3, gtJumpAcademy4],
    description: 'Designed for explosive jumps and quick cuts on the basketball court.',
    category: 'sports',
    brand: 'Nike',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    inStock: true
  },
  {
    id: 4,
    name: 'Jordan Air Rev',
    price: 7295,
    color: 'Red/Black',
    rating: 4.8,
    image: jordanAirRev,
    images: [jordanAirRev, jordanAirRev1, jordanAirRev2, jordanAirRev3, jordanAirRev4],
    description: 'A classic Jordan silhouette with modern performance features.',
    category: 'sports',
    brand: 'Jordan',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    inStock: true
  },
  {
    id: 5,
    name: 'Legend 10 Elite FG',
    price: 12995,
    color: 'Green/Black',
    rating: 4.9,
    image: legend10Elite,
    images: [legend10Elite, legend10Elite1, legend10Elite2, legend10Elite3, legend10Elite4],
    description: 'Professional-grade football boots designed for elite performance on firm ground.',
    category: 'sports',
    brand: 'Nike',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    inStock: true
  },
  {
    id: 6,
    name: 'Nike Dunk Low Retro',
    price: 5995,
    color: 'White/Green',
    rating: 4.6,
    image: nikeDunkLow,
    images: [nikeDunkLow, nikeDunkLow1, nikeDunkLow2, nikeDunkLow3, nikeDunkLow4],
    description: 'The iconic basketball shoe returns with premium materials and classic colorways.',
    category: 'casual',
    brand: 'Nike',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    inStock: true
  },
  {
    id: 7,
    name: 'Nike P-6000 Premium',
    price: 4495,
    color: 'Grey/Silver',
    rating: 4.5,
    image: nikeP6000,
    images: [nikeP6000, nikeP60001, nikeP60002, nikeP60003, nikeP60004],
    description: 'Retro-inspired running shoe with modern comfort and style.',
    category: 'casual',
    brand: 'Nike',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    inStock: true
  },
  {
    id: 8,
    name: 'Phantom 6 High Elite LE FG',
    price: 15995,
    color: 'Black/Gold',
    rating: 5.0,
    image: phantom6Elite,
    images: [phantom6Elite, phantom6Elite1, phantom6Elite2, phantom6Elite3, phantom6Elite4],
    description: 'Limited edition elite football boots with cutting-edge technology.',
    category: 'limited',
    brand: 'Nike',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    inStock: true
  }
]

export default localShoesData
