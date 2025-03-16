import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20, // Reduced padding
    fontFamily: "Helvetica",
    position: "relative", // Required for absolute positioning of the watermark
  },
  header: {
    marginBottom: 10, // Reduced margin
    textAlign: "center",
  },
  english: {
    fontSize: 16, // Adjusted font size
    fontWeight: "bold",
    marginBottom: 5,
  },
  advertisementNo: {
    fontSize: 12, // Adjusted font size
    marginTop: 5,
    marginBottom: 10, // Reduced margin
  },
  section: {
    margin: 5, // Reduced margin
    padding: 5, // Reduced padding
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 3,
  },
  watermark: {
    position: "absolute",
    top: "50%", // Center vertically
    left: "10%", // Center horizontally
    transform: "translate(-50%, -50%) rotate(-20deg)", // Center and rotate
    fontSize: 48,
    color: "rgba(0, 0, 0, 0.1)", // Semi-transparent text
    fontWeight: "bold",
    zIndex: -1, // Ensure the watermark is behind other content
  },
  sectionTitle: {
    fontSize: 14, // Adjusted font size
    fontWeight: "bold",
    marginBottom: 5, // Reduced margin
    textDecoration: "underline",
  },
  table: {
    display: "flex",
    width: "auto",
    borderWidth: 1,
    borderColor: "#000",
    marginVertical: 5, // Reduced margin
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCol: {
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 3, // Reduced padding
    flex: 1,
  },
  tableCell: {
    fontSize: 10, // Adjusted font size
  },
  tableCellHeader: {
    fontSize: 10, // Adjusted font size
    fontWeight: "bold",
  },
  postApplied: {
    marginBottom: 10, // Reduced margin
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  rowField: {
    flexDirection: "row",
    marginBottom: 3, // Reduced margin
  },
  label: {
    fontSize: 10, // Adjusted font size
    fontWeight: "bold",
    width: "30%",
  },
  value: {
    fontSize: 10, // Adjusted font size
    width: "70%",
  },
  signature: {
    marginTop: 20, // Reduced margin
    fontSize: 10, // Adjusted font size
    textAlign: "center",
  },
  declaration: {
    marginTop: 10, // Reduced margin
    fontSize: 10, // Adjusted font size
    textAlign: "justify",
    lineHeight: 1.2, // Reduced line height
  },
  footer: {
    position: "absolute",
    bottom: 20, // Reduced margin
    left: 20,
    right: 20,
  },
  pageNumber: {
    position: "absolute",
    bottom: 20, // Reduced margin
    right: 20,
    fontSize: 12, // Adjusted font size
    color: "grey",
  },
  logo: {
    width: 80, // Adjust the width of the logo
    height: 80, // Adjust the height of the logo
    marginRight: 20, // Add spacing between logo and text
  },
  // Container for text fields
  detailsText: {
    width: "70%", // Adjust the width as needed
  },

  // Container for the photo
  photoContainer: {
    width: "25%", // Adjust the width as needed
    alignItems: "flex-end", // Align the photo to the right
  },

  // Photo style
  photo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 10, // Add spacing below the photo
  },
  detailsContainer: {
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between", // Space between text and photo
  },
});

// Watermark Component
const Watermark = () => (
  <>
    <Text style={styles.watermark}>Indian Institute of Technology Patna</Text>
    <Image
      src="https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Indian_Institute_of_Technology%2C_Patna.svg/301px-Indian_Institute_of_Technology%2C_Patna.svg.png?20110527074658"
      style={styles.logo}
    />
  </>
);

// Main component
const FacultyApplicationForm = ({ data }) => {
  const {
    biodata,
    education_detail,
    employment_detail,
    teaching_experience,
    project_publication,
    awards_recognition,
    additional_info,
  } = data;

  console.log(
    biodata,
    education_detail,
    employment_detail,
    teaching_experience,
    project_publication,
    awards_recognition,
    additional_info
  );

  return (
    <Document>
      {/* Use a custom page size (e.g., A3 or a larger custom size) */}
      <Page size="A3" style={styles.page}>
        <Watermark />
        {/* Header */}
        <View style={styles.header}>
          {/* <Image src="https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Indian_Institute_of_Technology%2C_Patna.svg/301px-Indian_Institute_of_Technology%2C_Patna.svg.png?20110527074658"           style={styles.logo}        /> */}

          <Text style={styles.english}>
            Indian Institute of Technology Patna
          </Text>
          <Text style={styles.advertisementNo}>
            Advertisement No. IITP/FACEREC/2020/R0014
          </Text>
        </View>

        {/* Post Applied */}
        <View style={styles.postApplied}>
          <Text style={styles.sectionTitle}>Post Applied</Text>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>DEPARTMENT</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>POSITION</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>SPECIALIZATION</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Computer Science and Engineering
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Assistant Professor</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Artificial Intelligence</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Applicant's Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Applicant's Details</Text>

          {/* Container for photo and details */}
          <View style={styles.detailsContainer}>
            {/* Left side: Text fields */}
            <View style={styles.detailsText}>
              <View style={styles.rowField}>
                <Text style={styles.label}>Candidate's Name:</Text>
                <Text style={styles.value}>{biodata?.fullName || "N/A"}</Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>Father's / Husband's Name:</Text>
                <Text style={styles.value}>
                  {biodata?.fathersOrHusbandsName || "N/A"}
                </Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>Mother's Name:</Text>
                <Text style={styles.value}>
                  {biodata?.mothersName || "N/A"}
                </Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>Date of Birth:</Text>
                <Text style={styles.value}>
                  {biodata?.dateOfBirth || "N/A"}
                </Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>Gender:</Text>
                <Text style={styles.value}>{biodata?.gender || "N/A"}</Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>Category:</Text>
                <Text style={styles.value}>{biodata?.gender || "N/A"}</Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>Marital Status:</Text>
                <Text style={styles.value}>
                  {biodata?.maritalStatus || "N/A"}
                </Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>Citizen of India:</Text>
                <Text style={styles.value}>
                  {biodata?.citizenshipType || "N/A"}
                </Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>PWD:</Text>
                <Text style={styles.value}>
                  {biodata?.pwdCategory || "N/A"}
                </Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>Permanent Address:</Text>
                <Text style={styles.value}>
                  {biodata?.permanentAddress || "N/A"}
                </Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>Address for Correspondence:</Text>
                <Text style={styles.value}>
                  {biodata?.addressForCorrespondence || "N/A"}
                </Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>PIN Code:</Text>
                <Text style={styles.value}>{biodata?.pinCode || "N/A"}</Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>Mobile No:</Text>
                <Text style={styles.value}>{biodata?.mobileNo || "N/A"}</Text>
              </View>
              <View style={styles.rowField}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{biodata?.emailId || "N/A"}</Text>
              </View>
            </View>

            {/* Right side: Photo */}
            <View style={styles.photoContainer}>
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Indian_Institute_of_Technology%2C_Patna.svg/301px-Indian_Institute_of_Technology%2C_Patna.svg.png?20110527074658"
                style={styles.photo}
              />
            </View>
          </View>
        </View>

        {/* Page number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* Academic Qualifications Page */}
      <Page size="A3" style={styles.page}>
        {/* Academic Qualifications */}
        <Watermark />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Qualifications</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRowHeader}>
              <View style={{ ...styles.tableCol, width: "15%" }}>
                <Text style={styles.tableCellHeader}>SCHOOL/INSTITUTE</Text>
              </View>
              <View style={{ ...styles.tableCol, width: "10%" }}>
                <Text style={styles.tableCellHeader}>DATE OF ENTRY</Text>
              </View>
              <View style={{ ...styles.tableCol, width: "10%" }}>
                <Text style={styles.tableCellHeader}>DATE OF LEAVING</Text>
              </View>
              <View style={{ ...styles.tableCol, width: "15%" }}>
                <Text style={styles.tableCellHeader}>BOARD/UNIV.</Text>
              </View>
              <View style={{ ...styles.tableCol, width: "10%" }}>
                <Text style={styles.tableCellHeader}>EXAM/DEGREE</Text>
              </View>
              <View style={{ ...styles.tableCol, width: "10%" }}>
                <Text style={styles.tableCellHeader}>DIVISION</Text>
              </View>
              <View style={{ ...styles.tableCol, width: "15%" }}>
                <Text style={styles.tableCellHeader}>SUBJECTS</Text>
              </View>
              <View style={{ ...styles.tableCol, width: "7.5%" }}>
                <Text style={styles.tableCellHeader}>PERCENTAGE/CPI</Text>
              </View>
              <View style={{ ...styles.tableCol, width: "7.5%" }}>
                <Text style={styles.tableCellHeader}>YEAR OF PASSING</Text>
              </View>
            </View>

            {/* Table Rows (Dynamic) */}
            {education_detail?.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={{ ...styles.tableCol, width: "15%" }}>
                  <Text style={styles.tableCell}>
                    {item["SCHOOL/COLLEGE/INSTITUTE"] ?? "N/A"}
                  </Text>
                </View>
                <View style={{ ...styles.tableCol, width: "10%" }}>
                  <Text style={styles.tableCell}>
                    {item["DATE OF ENTRY"] ?? "N/A"}
                  </Text>
                </View>
                <View style={{ ...styles.tableCol, width: "10%" }}>
                  <Text style={styles.tableCell}>
                    {item["DATE OF LEAVING"] ?? "N/A"}
                  </Text>
                </View>
                <View style={{ ...styles.tableCol, width: "15%" }}>
                  <Text style={styles.tableCell}>
                    {item["BOARD/UNIVERSITY/INSTITUTION"] ?? "N/A"}
                  </Text>
                </View>
                <View style={{ ...styles.tableCol, width: "10%" }}>
                  <Text style={styles.tableCell}>
                    {item["EXAM/DEGREE/DIPLOMA PASSED"] ?? "N/A"}
                  </Text>
                </View>
                <View style={{ ...styles.tableCol, width: "10%" }}>
                  <Text style={styles.tableCell}>
                    {item["DISTINCTION/CLASS/DIVISION"] ?? "N/A"}
                  </Text>
                </View>
                <View style={{ ...styles.tableCol, width: "15%" }}>
                  <Text style={styles.tableCell}>
                    {item["SUBJECTS"] ?? "N/A"}
                  </Text>
                </View>
                <View style={{ ...styles.tableCol, width: "7.5%" }}>
                  <Text style={styles.tableCell}>
                    {item["PERCENTAGE OF MARKS/CPI"] ?? "N/A"}
                  </Text>
                </View>
                <View style={{ ...styles.tableCol, width: "7.5%" }}>
                  <Text style={styles.tableCell}>
                    {item["YEAR OF PASSING"] ?? "N/A"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRowHeader}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>
                  ORGANISATION/INSTITUTE
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>POSITION</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>NATURE OF DUTIES</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>DATE OF JOINING</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>DATE OF LEAVING</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>SCALE OF PAY</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>REMARKS</Text>
              </View>
            </View>

            {/* Table Rows (Dynamic) */}
            {employment_detail?.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item["ORGANISATION/INSTITUTION"] ?? "N/A"}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item["POSITION HELD"] ?? "N/A"}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item["NATURE OF DUTIES/WORK"] ?? "N/A"}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item["DATE OF JOINING"] ?? "N/A"}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item["DATE OF LEAVING"] ?? "N/A"}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item["LAST PAY & SCALE OF PAY"] ?? "N/A"}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item[
                      "ADDITIONAL REMARKS (ABOUT THE EXPERIENCE, IF ANY)"
                    ] ?? "N/A"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* References */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>References</Text>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>NAME</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>DESIGNATION</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>ADDRESS</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>EMAIL</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer1?.name || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer1?.designation || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer1?.address || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer1?.email || "N/A"}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer2?.name || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer2?.designation || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer2?.address || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer2?.email || "N/A"}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer3?.name || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer3?.designation || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer3?.address || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {additional_info?.referrer3?.email || "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Page number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      

      {/* PhD and Research Page */}
      <Page size="A3" style={styles.page}>
        <Watermark />
        {/* PhD Thesis Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PhD Thesis Details</Text>
          <View style={styles.rowField}>
            <Text style={styles.label}>Title of your Ph. D. Thesis:</Text>
            <Text style={styles.value}>
              Deep Learning Applications in Natural Language Processing
            </Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>Name of your Ph.D. Supervisor:</Text>
            <Text style={styles.value}>Dr. Andrew Miller</Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>Name of your Co-Supervisor:</Text>
            <Text style={styles.value}>Dr. Sarah Johnson</Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>Date of thesis submission:</Text>
            <Text style={styles.value}>01/04/2021</Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>Date of viva-voce:</Text>
            <Text style={styles.value}>15/05/2021</Text>
          </View>
        </View>

        {/* Thesis Guided */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thesis Guided</Text>
          <View style={styles.rowField}>
            <Text style={styles.label}>COMPLETED:</Text>
            <Text style={styles.value}>5</Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>ONGOING:</Text>
            <Text style={styles.value}>3</Text>
          </View>
        </View>

        {/* Patent Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patent Details</Text>
          <View style={styles.rowField}>
            <Text style={styles.label}>NUMBER OF PATENTS:</Text>
            <Text style={styles.value}>2 (granted), 5 (filed)</Text>
          </View>
        </View>

        {/* Citation Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Citation Details</Text>
          <Text style={styles.value}>
            150 as on 01/02/2024 (Source:Google Scholar) and 130 as on
            01/02/2024 (Source:Google Scopus)
          </Text>
        </View>

        {/* Research Publications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Research Publications</Text>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>YEAR, VOL. NO. PAGE</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>AUTHORS</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>
                  TITLE OF THE RESEARCH PAPER
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>JOURNAL/CONFERENCE</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>
                  H-INDEX AND/OR CORE RANK
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>IMPACT FACTOR</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>2023, Vol 45, pp. 123-135</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Doe J., Smith A., Brown B.</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Novel Deep Learning Architecture for NLP
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  IEEE Transactions on Neural Networks
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>45</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>5.6</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>2022, Vol 38, pp. 78-92</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Doe J., Johnson C.</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Transformer Models for Low-Resource Languages
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ACM Conference on NLP</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>38</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>4.2</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Additional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          <View style={styles.rowField}>
            <Text style={styles.label}>Specialization:</Text>
            <Text style={styles.value}>Artificial Intelligence</Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>
              Did you previously apply for any post in this Institute? /
              Advertisement Number:
            </Text>
            <Text style={styles.value}>NO</Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>
              If the appointment is offered, how much time would you need before
              joining the post?:
            </Text>
            <Text style={styles.value}>1 Month</Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>
              If you are employed, please state your present basic pay and scale
              of pay:
            </Text>
            <Text style={styles.value}>60000</Text>
          </View>
        </View>

        {/* Page number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* Teaching Experience and Achievements Page */}
      <Page size="A3" style={styles.page}>
        <Watermark />
        {/* Teaching Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teaching Experience</Text>
          <View style={styles.rowField}>
            <Text style={styles.label}>NO. OF DIFFERENT COURSES TAUGHT:</Text>
            <Text style={styles.value}>8</Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>NO. OF YEARS:</Text>
            <Text style={styles.value}>5</Text>
          </View>
        </View>

        {/* Books Published */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Books Published</Text>
          <Text style={styles.value}>
            Introduction to Machine Learning (2022), Advanced NLP Techniques
            (2023)
          </Text>
        </View>

        {/* Recognition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recognition</Text>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>CATEGORY</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>DETAILS</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Fellow of professional body
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>IEEE Senior Member</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Member of professional body
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ACM, AAAI</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Editorial board memberships
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Associate Editor, Journal of AI Research
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Seminars/conferences organized
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  International Conference on ML (2022), Workshop on NLP (2023)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Legal History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal History</Text>
          <View style={styles.rowField}>
            <Text style={styles.label}>
              Do you have any legal proceeding ongoing:
            </Text>
            <Text style={styles.value}>
              {additional_info?.legalProceeding || "N/A"}
            </Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>
              Have you at any time been charged acquitted or convicted by a
              court of law in India or outside India:
            </Text>
            <Text style={styles.value}>
              {additional_info?.courtCase || "N/A"}
            </Text>
          </View>
        </View>

        {/* Awards and Honors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Awards and Honors</Text>
          <Text style={styles.value}>
            Best Paper Award, IEEE Conference 2022
          </Text>
          <Text style={styles.value}>Young Researcher Award, ACM 2021</Text>
          <Text style={styles.value}>
            Outstanding Teaching Award, IIT Patna 2023
          </Text>
        </View>

        {/* Applicant's Signature */}
        <View style={styles.signature}>
          <Text>Applicant's Signature:</Text>
          {/* Placeholder for signature if available */}
          <View style={{ height: 30 }}></View>
        </View>

        {/* Page number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* Declaration Page */}
      <Page size="A3" style={styles.page}>
        <Watermark />
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.english}>
            Indian Institute of Technology Patna
          </Text>
          <Text style={styles.advertisementNo}>
            Advertisement No. {biodata?.advtNo || "N/A"}
          </Text>
        </View>

        {/* Declaration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Declaration</Text>
          <Text style={styles.declaration}>
            I hereby declare that I have carefully read and understood the
            instructions attached to the advertisement as available on Patna
            website and that all the entries in this form are true to the best
            of my knowledge and belief. I also declare that I have not concealed
            any material information which may debar my candidature for the post
            applied for. In the event of suppression or distortion of any fact
            like category or educational qualification etc. made in my
            application form, I understand that I will be denied any employment
            in the Institute and if already employed on any of the post in the
            Institute, my services will be summarily terminated forthwith
            without notice or compensation.
          </Text>

          <View style={{ marginTop: 30 }}>
            <View style={styles.rowField}>
              <Text style={styles.label}>
                (Signature of the Applicant with Date)
              </Text>
              <Text style={styles.value}></Text>
            </View>
            <View style={styles.rowField}>
              <Text style={styles.label}>Place:</Text>
              <Text style={styles.value}>Patna</Text>
            </View>
            <View style={styles.rowField}>
              <Text style={styles.label}>Dated:</Text>
              <Text style={styles.value}>15/03/2025</Text>
            </View>
          </View>
        </View>

        {/* For Office Use */}
        <View style={styles.section}>
          <View style={styles.rowField}>
            <Text style={styles.label}>Telephone:</Text>
            <Text style={styles.value}>+91-1234567890</Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>Fax:</Text>
            <Text style={styles.value}>+91-1234567891</Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>office@iitp.ac.in</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Signature:</Text>
            <Text style={styles.value}></Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>
              (Head of the Institution/Organization)
            </Text>
            <Text style={styles.value}></Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>Designation:</Text>
            <Text style={styles.value}></Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}></Text>
          </View>
          <View style={styles.rowField}>
            <Text style={styles.label}>Remarks:</Text>
            <Text style={styles.value}></Text>
          </View>
        </View>

        {/* Page number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export { FacultyApplicationForm };

async function getallapplicationform(jobpostingid) {
  try {
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    let res = await fetch(
      `${backendurl}/getallapplicationform/${jobpostingid}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    let data = await res.json();
    let applicationform = data?.data;
    let biodata = applicationform[0];
    let education_detail = applicationform[1]?.education_details;
    let employment_detail = applicationform[1]?.employment_details;
    let project_publication = applicationform[2];
    let teaching_experience = applicationform[3];
    let awards_recognition = applicationform[4];
    let additional_info = applicationform[5];

    const blob = await pdf(
      <FacultyApplicationForm
        data={{
          biodata,
          education_detail,
          employment_detail,
          teaching_experience,
          project_publication,
          awards_recognition,
          additional_info,
        }}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "FacultyApplicationForm.pdf";
    link.click();
    URL.revokeObjectURL(url);

    return;
  } catch (error) {
    console.error("Application form error in", error);
    return;
  }
}

export default getallapplicationform;
