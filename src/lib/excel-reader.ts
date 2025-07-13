import { NewPlayerExcel, NewTeamExcel } from "@/shared/types";

export async function readExcelFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        const lines = data.split("\n").filter((line) => line.trim());

        if (lines.length < 2) {
          reject(
            new Error(
              "El archivo debe tener al menos una fila de encabezados y una fila de datos"
            )
          );
          return;
        }

        const headers = lines[0]
          .split(",")
          .map((h) => h.trim().replace(/"/g, ""));
        const rows = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
          const row: any = {};

          headers.forEach((header, index) => {
            row[header] = values[index] || "";
          });

          return row;
        });

        resolve(rows);
      } catch (error) {
        console.log(error);
        reject(new Error("Error al procesar el archivo CSV"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error al leer el archivo"));
    };

    if (file.name.endsWith(".csv")) {
      reader.readAsText(file);
    } else {
      reject(
        new Error(
          "Solo se soportan archivos CSV. Para Excel, convierta a CSV primero."
        )
      );
    }
  });
}

export function normalizeEquiposData(data: any[]) {
  interface Equipo {
    nombre: string;
    cantidad_jugadores: number;
    logo: string;
  }

  const equipos = data
    .map((row) => ({
      nombre: row.NOMBRE || row.nombre || "",
      cantidad_jugadores:
        Number.parseInt(
          row.CANTIDAD_JUGADORES || row.cantidad_jugadores || "0"
        ) || 0,
      logo: row.LOGO || row.logo || "",
    }))
    .filter((row) => row.nombre && row.cantidad_jugadores > 0) as Equipo[];

  const newTeamsExcel: NewTeamExcel[] = equipos.map((equipo) => ({
    name: equipo.nombre,
    number_players: equipo.cantidad_jugadores,
    logo: equipo.logo,
  }));

  return newTeamsExcel;
}

export function normalizeJugadoresData(data: any[]) {
  interface Jugador {
    nombre: string;
    posicion: string;
    numero_camiseta: number;
  }

  const jugadores: Jugador[] = data
    .map((row) => ({
      nombre: row.NOMBRE || row.nombre || "",
      posicion: (row.POSICION || row.posicion || "").toUpperCase(),
      numero_camiseta:
        Number.parseInt(row.NUMERO_CAMISETA || row.numero_camiseta || "0") || 0,
    }))
    .filter((row) => row.nombre && row.posicion && row.numero_camiseta > 0);

  const newJugadoresExcel: NewPlayerExcel[] = jugadores.map((jugador) => ({
    name: jugador.nombre,
    position: jugador.posicion as NewPlayerExcel["position"],
    number: jugador.numero_camiseta,
  }));

  return newJugadoresExcel;
}
