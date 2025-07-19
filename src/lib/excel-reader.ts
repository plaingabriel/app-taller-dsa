import { NewPlayerExcel, NewTeamExcel } from "./definitions";

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
    players_count: equipo.cantidad_jugadores,
    logo: equipo.logo,
  }));

  return newTeamsExcel;
}

export function validateEquiposData(data: NewTeamExcel[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  data.forEach((row, index) => {
    const rowNum = index + 1;

    if (!row.name || typeof row.name !== "string") {
      errors.push(`Fila ${rowNum}: Nombre del equipo es requerido`);
    }

    if (!row.players_count || typeof row.players_count !== "number") {
      errors.push(`Fila ${rowNum}: Cantidad de jugadores debe ser un número`);
    } else if (row.players_count < 5 || row.players_count > 12) {
      errors.push(
        `Fila ${rowNum}: Cantidad de jugadores debe estar entre 5 y 12`
      );
    }
  });

  return { valid: errors.length === 0, errors };
}

export function normalizeJugadoresData(data: any[]) {
  interface Jugador {
    nombre: string;
    posicion: string;
    numero_camiseta: number;
    cedula: number;
    edad: number;
  }

  const jugadores: Jugador[] = data
    .map((row) => ({
      nombre: row.NOMBRE || row.nombre || "",
      posicion: (row.POSICION || row.posicion || "").toUpperCase(),
      numero_camiseta:
        Number.parseInt(row.NUMERO_CAMISETA || row.numero_camiseta || "0") || 0,
      cedula: Number.parseInt(row.CEDULA || row.cedula || "0") || 0,
      edad: Number.parseInt(row.EDAD || row.edad || "0") || 0,
    }))
    .filter(
      (row) =>
        row.nombre &&
        row.posicion &&
        row.numero_camiseta > 0 &&
        row.cedula > 0 &&
        row.edad > 0
    ) as Jugador[];

  const newJugadoresExcel: NewPlayerExcel[] = jugadores.map((jugador) => ({
    name: jugador.nombre,
    position: jugador.posicion as NewPlayerExcel["position"],
    age: jugador.edad,
    ci: jugador.cedula,
    jersey_number: jugador.numero_camiseta,
  }));

  return newJugadoresExcel;
}

export function validateJugadoresData(
  data: NewPlayerExcel[],
  agesRange: {
    min_age: number;
    max_age: number;
  }
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const numeros = new Set<number>();
  const { min_age, max_age } = agesRange;

  data.forEach((row, index) => {
    const rowNum = index + 1;

    // Validar nombre
    if (!row.name || typeof row.name !== "string") {
      errors.push(`Fila ${rowNum}: Nombre del jugador es requerido`);
    }

    // Validar cedula
    if (!row.ci || typeof row.ci !== "number") {
      errors.push(`Fila ${rowNum}: Cedula debe ser un número`);
    }

    // Validar posición
    const posicionesValidas = [
      "PORTERO",
      "DEFENSA",
      "MEDIOCAMPISTA",
      "DELANTERO",
    ];
    if (
      !row.position ||
      !posicionesValidas.includes(row.position.toUpperCase())
    ) {
      errors.push(
        `Fila ${rowNum}: Posición debe ser una de: ${posicionesValidas.join(
          ", "
        )}`
      );
    }

    // Validar número de camiseta
    if (!row.jersey_number || typeof row.jersey_number !== "number") {
      errors.push(`Fila ${rowNum}: Número de camiseta debe ser un número`);
    } else if (row.jersey_number < 0 || row.jersey_number > 99) {
      errors.push(`Fila ${rowNum}: Número de camiseta debe estar entre 0 y 99`);
    } else if (numeros.has(row.jersey_number)) {
      errors.push(
        `Fila ${rowNum}: Número de camiseta ${row.jersey_number} está duplicado`
      );
    } else {
      numeros.add(row.jersey_number);
    }

    // Validar edad
    if (!row.age || typeof row.age !== "number") {
      errors.push(`Fila ${rowNum}: Edad debe ser un número`);
    } else if (row.age < min_age || row.age > max_age) {
      errors.push(
        `Fila ${rowNum}: Edad debe estar entre ${min_age} y ${max_age}`
      );
    }
  });

  return { valid: errors.length === 0, errors };
}
