import { pages } from './seo'
import { createSocialImage, socialImageContentType, socialImageSize } from './social-image'

export const alt = pages.home.imageAlt
export const size = socialImageSize
export const contentType = socialImageContentType

export default function Image() {
  return createSocialImage(pages.home)
}
