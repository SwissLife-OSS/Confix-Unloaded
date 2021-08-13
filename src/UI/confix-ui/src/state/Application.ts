export interface Application {
  id: string;
  name: string;
  parts: {
    id: string;
    name: string;
    components: { definition: { id: string; name: string } }[];
  }[];
}
