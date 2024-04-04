/**
 * Serializer for nuxt virtual module
 * - Handles regexp
 */
export function serialize(source: object) {
  function replacer(key: string, value: unknown) {
    if (value instanceof RegExp)
      return `__REGEX__${value.toString()}__REGEX__`

    return value
  }

  const content = JSON.stringify(source, replacer, 2)

  // De-stringify regex strings
  const result = content.replaceAll(/"__REGEX__|__REGEX__"/gm, '')

  return result
}
