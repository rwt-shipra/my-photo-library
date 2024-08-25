import { CloudinaryResource } from "@/type/cloudinary";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface UseResources {
  intialResources?: Array<CloudinaryResource>;
  disableFetch?: boolean;
  tag?: string;
}

export function UseResources(options?: UseResources) {
  const queryClient = useQueryClient();
  const { disableFetch = false } = options || {};
  const { data: resources } = useQuery({
    queryKey: ["resources", options?.tag],
    queryFn: async () => {
      const { data } = await fetch("../../api/resources").then((r) => r.json());
      return data;
    },
    initialData: options?.intialResources,
    enabled: !disableFetch,
  });

  function addResources(results: Array<CloudinaryResource>) {
    queryClient.setQueryData(
      ["resources", String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)],
      (old: Array<CloudinaryResource>) => {
        return [...results, ...old];
      }
    );
    queryClient.invalidateQueries({
      queryKey: [
        "resources",
        String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG),
      ],
    });
  }
  return { resources, addResources };
}
