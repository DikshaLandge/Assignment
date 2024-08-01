import React, { useEffect, useState } from "react";

function Assignment() {
  const [displayData, setDisplayData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [gender, setGender] = useState("");
  const [state, setState] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [stateOptions, setStateOptions] = useState([]); 

  
  async function displayProducts() {
    setLoading(true); 
    try {
      const response = await fetch("https://dummyjson.com/users");
      const result = await response.json();
      setDisplayData(result.users);
      setTempData(result.users); 

      
      const uniqueStates = [
        ...new Set(result.users.map((user) => user.address.state)),
      ];
      setStateOptions(uniqueStates);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  function demographySortingFunc() {
    const sortedAge = [...tempData].sort((a, b) => a.age - b.age);
    setTempData(sortedAge);
  }


  function sortGender(selectedGender) {
    if (selectedGender === "male" || selectedGender === "female") {
      const filtered = displayData.filter(
        (ele) => ele.gender === selectedGender
      );
      setTempData(filtered);
    } else {
      
      setTempData(displayData);
    }
  }

  
  function sortState(selectedState) {
    if (selectedState) {
      const filtered = displayData.filter(
        (ele) => ele.address.state === selectedState
      );
      setTempData(filtered);
    } else {
    
      setTempData(displayData);
    }
  }


  function handleGenderChange(event) {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    sortGender(selectedGender);
  }


  function handleStateChange(event) {
    const selectedState = event.target.value;
    setState(selectedState);
    sortState(selectedState);
  }

  useEffect(() => {
    displayProducts();
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h3 style={styles.heading}>Employees</h3>
        <div style={styles.filters}>
        

          <select
            name="state"
            value={state}
            style={styles.select}
            onChange={handleStateChange}
          >
            <option value="">Country</option>
            {stateOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

        
          <select
            name="gender"
            value={gender}
            style={styles.select}
            onChange={handleGenderChange}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Image</th>
              <th style={styles.tableHeader}>Full Name</th>
              <th style={styles.tableHeader}>
                <button style={styles.sortButton} onClick={demographySortingFunc}>
                  Sort by Age
                </button>
              </th>
              <th style={styles.tableHeader}>Designation</th>
              <th style={styles.tableHeader}>Location</th>
            </tr>
          </thead>
          <tbody>
            {tempData.map((ele) => (
              <tr key={ele.id} style={styles.tableRow}>
                <td style={styles.tableData}>{ele.id}</td>
                <td style={styles.tableData}>
                  <img
                    src={ele.image}
                    alt={ele.firstName}
                    style={styles.image}
                  />
                </td>
                <td style={styles.tableData}>{`${ele.firstName} ${ele.maidenName} ${ele.lastName}`}</td>
                <td style={styles.tableData}>{`${ele.gender} / ${ele.age}`}</td>
                <td style={styles.tableData}>{ele.company.title}</td>
                <td style={styles.tableData}>{`${ele.address.state}, ${ele.address.country}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  select: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px 10px",
    fontSize: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    color: "#333",
    padding: "12px 15px",
    textAlign: "left",
    border: "1px solid #ccc", 
  },
  tableData: {
    padding: "12px 15px",
    textAlign: "left",
    border: "1px solid #ccc", 
  },
  sortButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  image: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  loadingButton: {
    display: "block",
    margin: "20px auto",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "not-allowed",
    fontSize: "16px",
  },
  reloadButton: {
    display: "block",
    margin: "20px auto",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
};

export default Assignment;
