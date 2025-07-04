// Image mapping utility to connect backend product data with frontend images
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

// Image mapping based on backend image field
const imageMap = {
  'AIRJORDAN1LOW.jpg': {
    main: airJordan1Low,
    images: [airJordan1Low, airJordan1Low1, airJordan1Low2, airJordan1Low3, airJordan1Low4]
  },
  'AIRZOOMPEGASUS41.jpg': {
    main: airZoomPegasus,
    images: [airZoomPegasus, airZoomPegasus1, airZoomPegasus2, airZoomPegasus3, airZoomPegasus4]
  },
  'G.T.JUMPACADEMYEP.jpg': {
    main: gtJumpAcademy,
    images: [gtJumpAcademy, gtJumpAcademy1, gtJumpAcademy2, gtJumpAcademy3, gtJumpAcademy4]
  },
  'JORDAN+AIR+REV.jpg': {
    main: jordanAirRev,
    images: [jordanAirRev, jordanAirRev1, jordanAirRev2, jordanAirRev3, jordanAirRev4]
  },
  'LEGEND10ELITEFG.jpg': {
    main: legend10Elite,
    images: [legend10Elite, legend10Elite1, legend10Elite2, legend10Elite3, legend10Elite4]
  },
  'NIKEDUNKLOWRETRO.jpg': {
    main: nikeDunkLow,
    images: [nikeDunkLow, nikeDunkLow1, nikeDunkLow2, nikeDunkLow3, nikeDunkLow4]
  },
  'NIKEP-6000PRM.jpg': {
    main: nikeP6000,
    images: [nikeP6000, nikeP60001, nikeP60002, nikeP60003, nikeP60004]
  },
  'PHANTOM6HIGHELITELEFG.jpg': {
    main: phantom6Elite,
    images: [phantom6Elite, phantom6Elite1, phantom6Elite2, phantom6Elite3, phantom6Elite4]
  }
}

// Default fallback image
const defaultImage = 'https://via.placeholder.com/300x300?text=No+Image'

/**
 * Maps backend product data with frontend images
 * @param {Object} backendProduct - Product data from backend
 * @returns {Object} Enhanced product with local images
 */
export const mapProductWithImages = (backendProduct) => {
  const imageKey = backendProduct.image
  const imageData = imageMap[imageKey]
  
  return {
    ...backendProduct,
    // Use local images if available, otherwise fallback
    image: imageData ? imageData.main : defaultImage,
    images: imageData ? imageData.images : [defaultImage],
    // Parse sizes if it's a JSON string
    sizes: typeof backendProduct.availableSizes === 'string' 
      ? JSON.parse(backendProduct.availableSizes) 
      : backendProduct.availableSizes || ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    // Ensure inStock is always a boolean
    inStock: backendProduct.inStock !== false,
    // Keep original image field for reference
    originalImageKey: imageKey
  }
}

/**
 * Maps an array of backend products with frontend images
 * @param {Array} backendProducts - Array of products from backend
 * @returns {Array} Enhanced products with local images
 */
export const mapProductsWithImages = (backendProducts) => {
  return backendProducts.map(mapProductWithImages)
}

export default {
  mapProductWithImages,
  mapProductsWithImages,
  imageMap
}
