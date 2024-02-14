import styled from "@emotion/styled"

const Tag = styled.div`
	display: inline-flex;
	border: 1px solid #afafaf;
	border-radius: 8px;
	padding: 4px 6px;
`

export interface RoleTagProps {
	roleName: string
}

export const RoleTag = ({ roleName }: RoleTagProps) => <Tag>{roleName}</Tag>
