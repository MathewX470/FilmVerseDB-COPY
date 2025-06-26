import publicClient from "../client/public.client";

const personEndpoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
};

const personApi = {
  detail: async ({ personId }) => {
    try {
      if (!personId || typeof personId !== "string" || personId.trim() === "") {
        throw new Error("Invalid person ID");
      }
      const response = await publicClient.get(
        personEndpoints.detail({ personId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  medias: async ({ personId }) => {
    try {
      if (!personId || typeof personId !== "string" || personId.trim() === "") {
        throw new Error("Invalid person ID");
      }
      const response = await publicClient.get(
        personEndpoints.medias({ personId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default personApi;
