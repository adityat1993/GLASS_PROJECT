import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import InputGroup from "../components/ui/Input/Group";
import InputField from "../components/ui/Input/Input";
import InputLabel from "../components/ui/Input/Label";
import Row from "../components/hoc/Row/Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserController from "./Controller/User";
import swal from "sweetalert";
import Loader from "react-loader";

let googleid = localStorage.getItem(`google`);

const DetailsPage = (props) => {
  const [Name, setName] = useState("");
  const [Day, setDate] = useState(0);
  const [Month, setMonth] = useState("0");
  const [Year, setYear] = useState(0);
  const [loader, setloader] = useState(true);

  const date = [
    "Day",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];

  const defaultOption = date[0];

  const month = [
    "Month",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const defaultMonth = month[0];

  const year = [
    "Year",
    2021,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
    2009,
    2008,
    2007,
    2006,
    2005,
    2004,
    2003,
    2002,
    2001,
    2000,
    1999,
    1998,
    1997,
    1996,
    1995,
    1994,
    1993,
    1992,
    1991,
    1990,
    1989,
    1988,
    1987,
    1986,
    1985,
    1984,
    1983,
    1982,
    1981,
    1980,
    1979,
    1978,
    1977,
    1976,
    1975,
    1974,
    1973,
    1972,
    1971,
    1970,
    1969,
    1968,
    1967,
    1966,
    1965,
    1964,
    1963,
    1962,
    1961,
    1960,
    1959,
    1958,
    1057,
    1956,
    1955,
    1954,
    1953,
    1952,
    1951,
    1950,
    1949,
    1948,
    1947,
    1946,
    1945,
    1944,
    1943,
    1942,
    1941,
    1940,
    1939,
    1938,
    1937,
    1936,
    1935,
    1934,
    1933,
    1932,
    1931,
    1930,
    1929,
    1928,
    1927,
    1926,
    1925,
    1924,
    1923,
    1922,
    1921,
  ];
  const defaultYear = year[0];

  const userInfo = () => {
    if (Name === "") {
      swal({
        title: "Alert!",
        text: "please enter the name",
        icon: "error",
      });
      return false;
    }

    if (Month.value === undefined) {
      swal({
        title: "Alert!",
        text: "please select month",
        icon: "error",
      });
      return false;
    }
    if (Day.value === undefined) {
      swal({
        title: "Alert!",
        text: "please select Day",
        icon: "error",
      });
      return false;
    }
    if (Year.value === undefined) {
      swal({
        title: "Alert!",
        text: "please select Year",
        icon: "error",
      });
      return false;
    }

    let dateUser = Year.value + "-" + Month.value + "-" + Day.value;
    setloader(false);
    let formdata = {
      userId: googleid,
      name: Name,
      birthDate: dateUser,
    };

    UserController.updateNameAndDOB(formdata, (result) => {
      setloader(true);
      localStorage.setItem("userName", Name)
      props.history.push("/home");
    });
  };
  return (
    <main>
      <div className="signUp__container">
        <div className="signUp__container__content">
          <div className="signUp__app">
            <div className="signUp__app__header">
              <div className="typo typo__b">Finish signing-up</div>
            </div>
            <div className="signUp__app__body">
              <InputGroup>
                <InputField
                  value={Name}
                  onChange={(val) => setName(val)}
                  type={"text"}
                  placeholder={"First Name / Nickname"}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel title={"Birthday"} optional={true} />
                <Row>
                  <div className="input__dropdown typo typo__b">
                    <Dropdown
                      options={month}
                      value={defaultMonth}
                      onChange={(val) => setMonth(val)}
                    />
                  </div>
                  <div className="input__dropdown typo typo__b">
                    <Dropdown
                      options={date}
                      value={defaultOption}
                      onChange={(val) => setDate(val)}
                    />
                  </div>
                  <div className="input__dropdown typo typo__b">
                    <Dropdown
                      options={year}
                      value={defaultYear}
                      onChange={(val) => setYear(val)}
                    />
                  </div>
                </Row>
              </InputGroup>
              <InputGroup>
                <div className="typo typo__b">
                  By selecting Agree and continue below. I agree to Glass's{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Privacy Policy
                  </span>
                </div>
              </InputGroup>
              <div
                className="typo typo__b"
                style={{
                  backgroundColor: "#000",
                  height: 33,
                  cursor: "pointer",
                }}
                onClick={() => {
                  userInfo();
                }}
              >
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    padding: 4,
                  }}
                >
                  Agree and continue
                </span>
                <Loader loaded={loader} className="spinner"></Loader>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;
