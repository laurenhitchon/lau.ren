import { pages } from '../seo'
import { createSocialImage, socialImageContentType, socialImageSize } from '../social-image'

export const alt = pages.contact.imageAlt
export const size = socialImageSize
export const contentType = socialImageContentType

export default function Image() {
  return createSocialImage(pages.contact)
}
