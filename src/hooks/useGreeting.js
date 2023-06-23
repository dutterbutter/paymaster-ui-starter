import { useState, useEffect } from "react";

const useGreeting = (contractInstance) => {
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getGreeting() {
      if (contractInstance) {
        const greeting = await contractInstance.greet();
        setGreeting(greeting);
        setLoading(false);
      }
    }

    getGreeting();
  }, [contractInstance]);

  return { greeting, loading };
};

export default useGreeting;
