import { toSerializable, type SerializableRecord } from '@payloadcms/tanstack-start/server'

type SerializedPayloadData<T> = T extends object ? T & SerializableRecord : T

/** Sanitize Payload's open-ended rich-text fields before the server-function transport. */
export function serializePayloadData<T>(data: T): SerializedPayloadData<T> {
  // The adapter removes unsupported values; retain the document fields and mark that result
  // as serializable using the same transport type as Payload's layout loader.
  return toSerializable(data) as SerializedPayloadData<T>
}
