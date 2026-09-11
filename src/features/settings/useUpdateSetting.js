import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("cabbin updated setting");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  return { mutate, isPending, error };
}
