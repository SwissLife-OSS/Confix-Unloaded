export interface Application {
  id: string;
  name: string;
  parts: {
    id: string;
    name: string;
    components: { id: string; name: string }[];
  }[];
}
