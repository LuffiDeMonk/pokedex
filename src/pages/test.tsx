import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";

export interface RandomUserResponse {
  results: User[];
  info: Info;
}

export interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: DateInfo;
  registered: DateInfo;
  phone: string;
  cell: string;
  id: Identification;
  picture: Picture;
  nat: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: string | number; // sometimes number, sometimes string
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Street {
  number: number;
  name: string;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface DateInfo {
  date: string; // ISO string
  age: number;
}

export interface Identification {
  name: string;
  value: string | null; // sometimes null
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

const flattenLocationInformation = (users: User[]) => {
  return users.map((user) => ({
    name: user.location.city,
    country: user.location.country,
    streetName: user.location.street.name,
    streetNumber: user.location.street.number,
    timezoneOffset: user.location.timezone.offset,
    timezoneDescription: user.location.timezone.description,
  }));
};

// ✅ fetch user function
const fetchUser = async (): Promise<RandomUserResponse | undefined> => {
  try {
    const { data } = await axios.get<RandomUserResponse>(
      "https://randomuser.me/api/?results=20"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

enum OrderList {
  ASCENDING = "Ascending",
  DESCENDING = "Descending",
}

export const Testing = () => {
  const [users, setUsers] = useState<
    ReturnType<typeof flattenLocationInformation>
  >([]);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [search, setSearch] = useState("");
  const [orderList, setOrderList] = useState(OrderList.ASCENDING);

  useEffect(() => {
    const getUsers = async () => {
      const apiResponse = await fetchUser();
      if (apiResponse) {
        const flattenedResponse = flattenLocationInformation(
          apiResponse.results
        );
        setUsers(flattenedResponse); // ✅ update state
      }
    };

    getUsers(); // call async fn inside useEffect
  }, []);

  const sortTableData = () => {
    const sortedData = [...users]
      .filter((user) =>
        Object.values(user).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      )
      .sort((a, b) => {
        const valueA = a[selectedColumn as keyof typeof a];
        const valueB = b[selectedColumn as keyof typeof b];

        switch (orderList) {
          case OrderList.ASCENDING:
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;

          case OrderList.DESCENDING:
            if (valueA > valueB) return -1;
            if (valueA < valueB) return 1;
            return 0;

          default:
            return 0;
        }
      });

    return sortedData;
  };

  return (
    <div>
      <Input onChange={(event) => setSearch(event.target.value)} />
      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
        <thead className="bg-red-50">
          <tr>
            {users.length > 0 &&
              Object.keys(users[0]).map((key) => (
                <th onClick={() => setSelectedColumn(key)} key={key}>
                  <div>{key}</div>
                  <div className="flex gap-2">
                    <button onClick={() => setOrderList(OrderList.ASCENDING)}>
                      Asc
                    </button>
                    <button onClick={() => setOrderList(OrderList.DESCENDING)}>
                      Desc
                    </button>
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sortTableData().map((user, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(user).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
