//-----------------------------------------------------
// Fonction Asyncrhone pour contacter l'API avec method fetch()
//-----------------------------------------------------

export const getData = async (url) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const result = await res.json();

      console.log("🚀 ~ getData ~ result:", result);

      return result;
    } else {
      throw new Error("Erreur traitement  Json");
    }
  } catch (error) {
    console.error("error getData");
    return error;
  }
};
