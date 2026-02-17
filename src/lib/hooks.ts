import { useMutation, useQuery } from "@tanstack/react-query";
import { ingestFile, fetchForecast } from "./api";

// Hook for the "Ingestion Agent"
export const useIngestAgent = () => {
  return useMutation({
    mutationFn: ingestFile,
    onSuccess: (data) => {
      console.log("Agents Finished:", data);
    },
  });
};

// Hook for the "CFO Agent"
export const useCFOAgent = (historyData: any[]) => {
  return useQuery({
    queryKey: ["forecast", historyData],
    queryFn: () => fetchForecast(historyData),
    enabled: !!historyData.length, // Only run if we have data
  });
};