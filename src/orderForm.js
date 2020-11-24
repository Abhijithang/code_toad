const { Formik } = formik;
import * as yup from 'yup'

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
  terms: yup.bool().required(),
});

function FormExample() {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        id: this.props.item.id,
        name: this.props.item.name,
        color: "",
        size: "",
        amount: ""
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form inline style={{float:"right"}} noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group controlId="validationFormik01">
              <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">Color:</Form.Label>
              <Form.Control
                type="text"
                name="color"

                value={values.color}
                onChange={handleChang}
                isInvalid={!!errors.color}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />

              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik04">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
              />
              <Form.Control.Feedback type="invalid">
                {errors.state}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik05">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isInvalid={!!errors.zip}
              />

              <Form.Control.Feedback type="invalid">
                {errors.zip}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              id="validationFormik0"
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

render(<FormExample />);


<Form inline style={{float:"right"}}>
  <Form.Group>
    <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">
      MSRP:
    </Form.Label>
    <span>{priceTag}</span>
  </Form.Group>
  <Form.Group>
    <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">
      Color
    </Form.Label>
    <Form.Control size="sm" as="select"
    id="color"
    className="ml-2 mr-4"
    value={this.state.order.color}
    onChange={this.setOrder} >
      <option key="" value="">Choose...</option>
      {colorOptions}
    </Form.Control>
  </Form.Group>

  <Form.Group>
    <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">
      Size
    </Form.Label>
    <Form.Control size="sm" as="select"
    id="size"
    className="ml-2 mr-4"
    value={this.state.order.size}
    onChange={this.setOrder}>
      <option key="" value="">Choose...</option>
      {sizeOptions}
    </Form.Control>
  </Form.Group>




  <Form.Group>
    <Form.Label style={this.labelWidth} htmlFor="inlineFormCustomSelectPref">
      Amount
    </Form.Label>
    <Form.Control size="sm" as="select"
    id="amount"
    custom
    className="ml-2 mr-4"
    value={this.state.order.amount}
    onChange={this.setOrder}>
      {amountOptions}

    </Form.Control>

  </Form.Group>
  <Form.Group style={{float:"right"}}>
    <Form.Label  htmlFor="inlineFormCustomSelectPref">
      &nbsp;&nbsp;
    </Form.Label>
    <Button size="sm" onClick={this.resetOrder} variant="warning">Reset</Button>
    <Button size="sm" onClick={this.addToCart}  style={{marginLeft:"5px"}}>Add to Cart</Button>
  </Form.Group>
</Form>
