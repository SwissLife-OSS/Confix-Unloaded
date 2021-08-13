import { CreateComponentPublicInstance } from "vue";
import { Store } from "vuex";
import { Any } from "./Any";

export function extractStore(
  value: CreateComponentPublicInstance<Any, Any, Any, Any>
): Store<Any> {
  return (value as Any).$store;
}
